import React,{Component} from 'react';
import NormalHeaderBar from './../common/normalHeaderBar';
import $ from 'jquery';
import {httpAddress} from './../config.js';
import {valINarr} from './../function/common';
export default class FilterProduce extends Component{
  constructor(props) {
    super(props);
    this.state = {
      produceType:this.props.bidList.produceType,
      sord:this.props.bidList.sord,
      sidx:this.props.bidList.sidx,
      searchProductStatus:this.props.bidList.searchProductStatus,
      active:this.props.bidList.active,
      areaId:this.props.bidList.areaId,
      keys:[]
    };
  }
  componentDidMount(){
    this.setState({
      keys:this.state.keys.concat(this.props.bidList.areaId)
    });
  }
  componentWillUnmount(){
  }
  _cancel(){
    this.props.dispatch({
      type:'UNSHOWFILTERPBIDLIST'
    })
  }
  _sureButton(){
    console.log(this.state.active);
    this.props.fn(this.state);
  }
  areaIdArr(arr,val){
    var narr = [];
      narr = arr;
    if(narr.indexOf(val) == -1){
      narr.push(val);
    }
    return narr;
  }
  _ahandleClick(id,index) {
    if (index == "0") {
      if (this.state.areaId.indexOf("0") == -1) {
       //let areaId = [];
        for (var i = 0; i < this.props.bidList.getBidAreaInfo.length; i++) {
          this.setState({
            keys: this.areaIdArr(this.state.keys,this.props.bidList.getBidAreaInfo[i].id)
          });
        }
      } else {
        this.setState({
          keys: []
        });
      }
    }else {
      if(this.state.keys.indexOf("0") != -1){
        this.setState({
          keys:[]
        });
        setTimeout(()=>{
          this.setState({
            keys: valINarr(this.state.keys, id)
          });
        })
      }else{
        this.setState({
          keys:valINarr(this.state.keys, id)
        });
      }
    }
    setTimeout(()=>{
      this.setState({
        areaId: this.state.keys
      });
    })
  }
  render(){
    return(
      <div className="modal-backdrop">
        <div className="modal-backdrop-bg"></div>
        <div className="modal">
          <NormalHeaderBar cancelButton={this._cancel.bind(this)} sureButton={this._sureButton.bind(this)} title="请选择"/>
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