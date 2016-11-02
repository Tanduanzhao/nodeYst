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
      active:this.props.bidList.active,
      areaId:this.props.bidList.areaId,
      keys:[]
    };
  }
  //shouldComponentUpdate(nextProp,nextState){
  //  console.log(nextProp)
  //  console.log(nextState)
  //  this.setState({
  //    areaId: this.props.bidList.areaId
  //  });
  //}
  componentDidMount(){
    this.setState({
      keys:this.state.keys.concat(this.props.bidList.areaId)
    });
  }
  componentWillUnmount(){
    //console.log(this.props.bidList.provinceId,"provinceId");
    //console.log(this.state.areaId,"areaId")
    //console.log(this.props.sss,"ssss");
    //this.setState({
    //  areaId: this.props.sss
    //});
    //console.log(this.state.areaId,"areaId");
  }
  _cancel(){
    //console.log(this.props.bidList.provinceId,"sss")
    //this.setState({
    //  areaId: this.props.bidList.provinceId
    //});
    this.props.dispatch({
      type:'UNSHOWFILTERPBIDLIST'
    })
  }
  _sureButton(){
    console.log(this.state.active)
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
    //console.log(id,"id")
    //console.log(index=="0"&&this.state.areaId.indexOf("0")==-1,"dd")
    //console.log(this.state.areaId.indexOf("0"),"length")
    if (index == "0") {
      if (this.state.areaId.indexOf("0") == -1) {
       //let areaId = [];
        for (var i = 0; i < this.props.bidList.getBidAreaInfo.length; i++) {
          //areaId.push(this.props.bidList.getBidAreaInfo[i].id);
          this.setState({
            keys: this.areaIdArr(this.state.keys,this.props.bidList.getBidAreaInfo[i].id)
          });
        }
        //this.setState({
        //  areaId: areaId
        //});
      } else {
        this.setState({
          keys: []
        });
      }
    }else {
      if(this.state.keys.indexOf("0") != -1){
        console.log(this.state.keys,"dddd")
        this.setState({
          keys:[]
        });
        setTimeout(()=>{
          this.setState({
            keys: valINarr(this.state.keys, id)
          });
        })
      }else{
        console.log(this.state.keys,"ttttttt")
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
  //_spanhandleClick(id,e,t){
  //  this.setState({
  //    areaId :id,
  //    areaName: e,
  //    searchAreaType:t
  //  })
  //}
  //componentDidMount(){
  //  if(!this.props.bidList.getProjectStatus){
  //    //匹配目录
  //    for(let i=0;i<this.props.bidList.getProjectStatus.length;i++){
  //      if(this.props.bidList.getProjectStatus[i].id == this.props.id[0]){
  //        this.setState({
  //          areaId:this.state.areaId.concat([i])
  //        });
  //        break;
  //      }
  //    }
  //  }
  //}
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
                    //console.log(this.state.areaId,"getBidAreaInfo")
                    //console.log(ele.id,"ddd")
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