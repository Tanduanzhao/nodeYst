/*
 医院列表
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import FooterBar from './footerBar';
import {Link} from 'react-router';
import FilterProduce from './filterProduce';
import Loading from './loading';

class Produce extends Component {
  constructor(props){
    super(props);
    this.state={
      data:[
        {id:"1",prodName:"慢阻肺患者的用药图谱.",dosSname:"200",nub:1211,icon:"报告试读",url:"charge",img:"produce_Item01"},
        {id:"2",prodName:"广东省药械政策变化和市场机遇.",dosSname:"0",nub:3211,icon:"点击查看",url:"free",img:"produce_Item02"}
      ],
      loading:true
    };
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
        <Main {...this.props} data={this.state.data} loading={this.state.loading}/>
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
    this.state= {
      nub: this.props.dataSources.nub
      }
    };
  _subscribe(event) {
    this.setState({
      nub:this.state.nub * 1+1
    })
    event.preventDefault();
  }
  render(){
    return(
        <div className="col-50">
          <Link to={`/produce/${this.props.dataSources.url}`}>
            <img src={`/images/${this.props.dataSources.img}.jpg`} style={{display:'block',width: "100%"}}/>
            <h3> {this.props.dataSources.prodName}</h3>
            <div className="produce-card-price">¥{this.props.dataSources.dosSname}</div>
            <p className="produce-card-footer">
              <span style={{textAlign:'left'}}  onClick={this._subscribe.bind(this)}>{this.state.nub}人订阅</span>
              <i className="produce-card-icon">{this.props.dataSources.icon}</i>
            </p>
          </Link>
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