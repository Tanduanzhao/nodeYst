import React,{Component} from 'react';
import NormalHeaderBar from './normalHeaderBar';
import $ from 'jquery';
import {httpAddress} from './config.js';
import {valINarr} from './function/common';
export default class FilterProduce extends Component{
  constructor(props) {
    super(props);
    this.state = {
      produceType:this.props.bidList.produceType,
      sord:this.props.bidList.sord,
      sidx:this.props.bidList.sidx,
      searchProductStatus:this.props.bidList.searchProductStatus,
      active:null,
      areaId:[]
    };
  }
  _cancelButton(){
    this.props.dispatch({
      type:'UNSHOWFILTERPBIDLIST'
    })
  }
  _sureButton(){
    console.log(this.state.sidx)
    this.props.fn(this.state);
  }
  _spanhandleClick(id,e,t){
    this.setState({
      areaId :id,
      areaName: e,
      searchAreaType:t
    })
  }
  _ahandleClick(id,index) {
    console.log(id)
    this.setState({
      areaId: valINarr(this.state.areaId, id)
    });
  }
  componentDidMount(){
    if(!this.props.bidList.getProjectStatus){
      //匹配目录
      for(let i=0;i<this.props.bidList.getProjectStatus.length;i++){
        if(this.props.bidList.getProjectStatus[i].id == this.props.id[0]){
          this.setState({
            areaId:this.state.areaId.concat([i])
          });
          break;
        }
      }
    }
  }
  render(){
    return(
      <div className="modal-backdrop">
        <div className="modal-backdrop-bg"></div>
        <div className="modal">
          <NormalHeaderBar cancelButton={this._cancelButton.bind(this)} sureButton={this._sureButton.bind(this)} title="请选择"/>
          <div className="scroll-content has-header" style={{backgroundColor:'#fff'}}>
            <h2 className="item item-divider">项目状态</h2>
            <div className="list padding">
              <ul className="list-horizontal-block">
                {
                  this.props.bidList.getProjectStatus.map((ele,index)=>{
                      return(
                          <li key={index} style={(this.state.searchProductStatus == ele.statusNum) ? styles.active : null} onClick={()=>{this.setState({searchProductStatus:ele.statusNum })}}>{ele.statusName}</li>
                      )
                  })
                }
              </ul>
            </div>
            <h2 className="item item-divider">排序</h2>
            <div className="list padding">
              <ul className="list-horizontal-block">
                <li style={(this.state.active == 0) ? styles.active : null} onClick={()=>{this.setState({sord:"desc",sidx:"publishDate",active:0})}}>最新时间</li>
                <li style={(this.state.active == 1) ? styles.active : null} onClick={()=>{this.setState({sord:"asc",sidx:"bidPrice",active:1})}}>最低价格</li>
                <li style={(this.state.active == 2 ) ? styles.active : null} onClick={()=>{this.setState({sord:"desc",sidx:"bidPrice",active:2})}}>最高价格</li>
              </ul>
            </div>
            <h2 className="item item-divider">区域选择</h2>
            <div className="list padding">
                <ul className="list-horizontal-block">
                {
                  this.props.bidList.getBidAreaInfo.map((ele,index)=> {
                    return (<li key={ele.id} style={(this.state.areaId.indexOf(ele.id) != -1) ? styles.active : null} onClick={this._ahandleClick.bind(this,ele.id,index)}>{ele.areaName}</li>)
                  })
                }
                </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const styles = {
  active:{
    backgroundColor:'#0284D0',
    color:'#fff'
  },
  fTitle:{
    color:'#000',
    fontWeight:'bold'
  }
}