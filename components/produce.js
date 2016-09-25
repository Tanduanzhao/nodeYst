/*
 医院列表
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import FooterBar from './footerBar';
import {Link} from 'react-router';
import FilterProduce from './filterProduce';
import Loading from './loading';

import {loadReportList} from './function/ajax';

class Produce extends Component {
  constructor(props){
    super(props);
    console.log(this.props.params.id)
    this.state={
      searchType:this.props.produceFilter.searchType,
      loading:true
    };
  }
  componentDidMount(){
    console.log(this.state.searchType)
    loadReportList({
      searchType:this.state.searchType,
      callBack:(res)=>{
        console.log(res.datas)
        this.props.dispatch({
          type:'LOADPRODUCEDATA',
          data: res.datas
        });
      }
    });
  }
  componentWillUnmount(){
    this.props.dispatch({
      type:'CHANGETYPE',
      searchType: 0
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
        <HeaderBar {...this.props}/>
        <Main {...this.props} data={this.props.produceFilter.data} loading={this.state.loading}/>
        <FooterBar {...this.props}/>
        {
          this.props.produceFilter.isShowFilter ?
            <FilterProduce fn={this._fn.bind(this)}  {...this.props} dataSources={this.props.provicenData}/> : null
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
          <input ref="hospitalSearchName" type="search" placeholder="请输入搜索关键词"/>
        </label>
        <button className="button button-clear">
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
    return(
      <div>
        <div className="scroll-content has-header row produce-cards">
            {
              this.props.data.map((ele,index)=> <List dataSources={ele} key={ele.id}/>)
            }
        </div>
      </div>
    )
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
        string = <i className="produce-card-icon">报告试读</i>;
      }else{
        string = <i className="produce-card-icon">点击查看</i>;
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
            <div className="produce-card-price">¥{this.state.price}</div>
            <p className="produce-card-footer">
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
    subscribe:state.Produce.subscribe,
    subscribeTwo:state.Produce.subscribeTwo,
    showProvicen:state.index.showProvicen,
    areaId:state.provicen.areaId,
    areaName:state.provicen.areaName,
    provicenData:state.provicen.data,
    yearMonth:state.data.yearMonth,
    uri:state.router.uri,
    produceFilter:state.Produce,
    searchAreaType:state.provicen.searchAreaType
  }
}

export default connect(select)(Produce);