/*
 报告列表
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import FooterBar from './footerBar';
import {Link} from 'react-router';
import FilterReport from './filterReport';
import Loading from './loading';
import EmptyComponent from './emptyComponent';

import {loadReportList} from './function/ajax';

class Report extends Component {
  constructor(props){
    super(props);
    console.log(this.props.params.id)
    this.state={
      searchType:this.props.report.searchType,
      loading:true
    };
    this._loadData = this._loadData.bind(this);
    this._infiniteScroll = this._infiniteScroll.bind(this);
  }
  _loadData(){
    loadReportList({
      titleOrReportKey:this.props.report.titleOrReportKey,
      pageNo:this.props.report.pageNo,
      searchType:this.props.report.searchType,
      callBack:(res)=>{
        console.log(this.props.report.titleOrReportKey)
        console.log(res.datas)
        this.props.dispatch({
          type:'LOADPRODUCEDATA',
          data:this.props.report.data.concat(res.datas),
          pageNo:this.props.report.pageNo+1
        });
        if(res.totalSize <= this.props.report.data.length){
          this.props.dispatch({
            type:'UNINFINITE'
          });
        }else{
          this.props.dispatch({
            type:'INFINITE'
          });
        }
        this.setState({
          loading:false
        });
      }
    });
  }
  _infiniteScroll(){
    //全部高度-滚动高度 == 屏幕高度-顶部偏移
    if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && !this.props.report.infinite){
      this._loadData();
    }
  }
  componentDidMount(){
    this.ele = this.refs.content;
    console.log(this.refs.content);
    this.ele.addEventListener('scroll',this._infiniteScroll);
    console.log(this.state.searchType)
    this._loadData()
  }
  componentWillUnmount(){
    this.props.dispatch({
      type:'CHANGETYPE',
      searchType: null
    });
  }
  _fn(args) {
    this.props.dispatch({
      type:'UNSHOWFILTERPRODUCE'
    })
  }
  render() {
    return (
      <div className="root">
        <HeaderBar fn={this._loadData} {...this.props}/>
        <div  ref="content"  className="scroll-content has-header">
          <Main data={this.props.report.data} loading={this.state.loading}/>
        </div>
        <FooterBar {...this.props}/>
        {
          this.props.report.isShowFilter ?
            <FilterReport fn={this._fn.bind(this)}  {...this.props} dataSources={this.props.provicenData}/> : null
        }
      </div>
    )
  }
}
class HeaderBar extends Component{
  _showProvicenHandle(){
    this.props.dispatch({
      type:'SHOWFILTERPRODUCE'
    });
  }
  _changeHandle(){
    this.props.dispatch({
      type:'CHANGETITLEORREPORTKEY',
      titleOrReportKey:encodeURI(encodeURI(this.refs.hospitalSearchName.value))
    })
  }
  _searchHandle(){
    this.props.dispatch({
      type:'LOADPRODUCEDATA',
      data:[],
      pageNo:1,
    });
    setTimeout(()=> this.props.fn(),100);
  }
  render(){
    return(
      <div className="bar bar-header bar-positive item-input-inset">
        <div className="buttons">
          <button className="button" onClick={this._showProvicenHandle.bind(this)}>
            <i className="fa fa-th-large  fa-2x" aria-hidden="true" style={{display:"block"}}></i>
          </button>
        </div>
        <label className="item-input-wrapper">
          <i className="icon ion-ios-search placeholder-icon"></i>
          <input ref="hospitalSearchName" onChange={this._changeHandle.bind(this)} type="search" placeholder="请输入搜索关键词"/>
        </label>
        <button className="button button-clear" onClick={this._searchHandle.bind(this)}>
           搜索
        </button>
      </div>
    )
  }
}
class Main extends Component{
  constructor(props){
    super(props);
  }
  render(){
    if(this.props.loading) {
      return <Loading/>
    }else{
      if(this.props.data.length != 0){
        return(
            <ul className="report-cards row">
              {
                this.props.data.map((ele,index)=> <List dataSources={ele} key={ele.id}/>)
              }
            </ul>
        )
      }else{
        return <EmptyComponent/>
      }
    }
  }
}
class List extends Component{
  constructor(props){
    super(props);
    };
  render(){
    var string = null;
    var tag = (()=>{
      if(this.props.dataSources.costStatus == "1"){
        string = <i className="report-card-icon">报告试读</i>;
      }else{
        string = <i className="report-card-icon">点击查看</i>;
      }
      return string;
    })();
    var number = (()=>{
      if(this.props.dataSources.costStatus == "1"){
        string = <span style={{textAlign:"left"}}>{this.props.dataSources.num}人购买</span>;
      }else{
        string = <span style={{textAlign:"left"}}>{this.props.dataSources.num}人查看</span>;
      }
      return string;
    })();
    if(this.props.dataSources.costStatus == "1"){
      this.state= {
        price: this.props.dataSources.price
      }
    }else{
      this.state= {
        price: 0
      }
    }
    return(
        <div className="col-50">
          <a href={`/pdf?file=${encodeURIComponent(`http://yst-test.immortalshealth.com/modm/pub/getPubPdf?reportId=${this.props.dataSources.id}`)}`}>
            <img src={this.props.dataSources.mainImg} style={{display:'block',width: "100%"}}/>
            <h3> {this.props.dataSources.title}</h3>
            <div className="report-card-price">¥{this.state.price}</div>
            <p className="report-card-footer">
              {number}
              {tag}
            </p>
          </a>
        </div>
    )
  }
}
function select(state){
  return{
    subscribe:state.report.subscribe,
    subscribeTwo:state.report.subscribeTwo,
    showProvicen:state.index.showProvicen,
    areaId:state.provicen.areaId,
    areaName:state.provicen.areaName,
    provicenData:state.provicen.data,
    yearMonth:state.data.yearMonth,
    uri:state.router.uri,
    report:state.report,
    searchAreaType:state.provicen.searchAreaType
  }
}

export default connect(select)(Report);