import React,{Component} from 'react';
import NormalHeaderBar from './normalHeaderBar';
import $ from 'jquery';
import {httpAddress} from './config.js';
export default class FilterProduce extends Component{
  constructor(props) {
    super(props);
    this.state = {
      produceType:this.props.bidList.produceType,
      sord:this.props.bidList.sord,
      searchProductStatus:this.props.bidList.searchProductStatus,
    };
  }
  _cancelButton(){
    this.props.dispatch({
      type:'UNSHOWFILTERPBIDLIST'
    })
  }
  _sureButton(){
    console.log(this.state.searchProductStatus)
    this.props.fn(this.state);
  }
  _spanhandleClick(id,e,t){
    this.setState({
      areaId :id,
      areaName: e,
      searchAreaType:t
    })
  }
  render(){
    console.log(this.props.bidList.getProjectStatus)
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
                  this.props.bidList.getProjectStatus.map((ele)=>{
                      return(
                          <div key={ele.id}>
                            <li style={(ele.statusNum == 1) ? styles.active : null} onClick={()=>{this.setState({searchProductStatus:ele.statusNum })}}>{ele.statusName}</li>
                          </div>
                      )
                  })
                }
              </ul>
            </div>
            <h2 className="item item-divider">排序</h2>
            <div className="list padding">
              <ul className="list-horizontal-block">
                <li style={(this.state.sord == null) ? styles.active : null} onClick={()=>{this.setState({sord:null})}}>最新时间</li>
                <li style={(this.state.sord == "asc") ? styles.active : null} onClick={()=>{this.setState({sord:"asc"})}}>最低价格</li>
                <li style={(this.state.sord == "desc" ) ? styles.active : null} onClick={()=>{this.setState({sord:"desc"})}}>最高价格</li>
              </ul>
            </div>
            <h2 className="item item-divider">区域选择</h2>
            <div className="list padding">
              {
                this.props.bidList.getBidAreaInfo.map((ele)=>{
                  if(true){
                    return(
                        <div key={ele.id}>
                          <h3 className="list-horizontal-title"><span>{ele.areaName}</span></h3>
                          <ul className="list-horizontal-block">
                          </ul>
                        </div>
                    )
                  }
                })
              }
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