import React,{Component} from 'react';
import NormalHeaderBar from './../common/normalHeaderBar';
export default class FilterProduce extends Component{
  constructor(props) {
    super(props);
    this.state = {
      tradeType:this.props.stores.tradeType,
    };
  }
  _cancelButton(){
    this.props.dispatch({
      type:'UNSHOWFILTERPRODUCT'
    })
  }
  _sureButton(){
    console.log(this.state.tradeType)
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
    return(
      <div className="modal-backdrop">
        <div className="modal-backdrop-bg"></div>
        <div className="modal">
          <NormalHeaderBar cancelButton={this._cancelButton.bind(this)} sureButton={this._sureButton.bind(this)} title="请选择"/>
          <div className="scroll-content has-header" style={{backgroundColor:'#fff'}}>
            <h2 className="item item-divider">药品分类</h2>
            <div className="list padding">
              <ul className="list-horizontal-block">
                <li style={(this.state.tradeType == 3) ? styles.active : null} onClick={()=>{this.setState({tradeType:3})}}>全部</li>
                <li style={(this.state.tradeType == 0) ? styles.active : null} onClick={()=>{this.setState({tradeType:0})}}>西药</li>
                <li style={(this.state.tradeType == 1) ? styles.active : null} onClick={()=>{this.setState({tradeType:1})}}>中成药</li>
                <li style={(this.state.tradeType == 2) ? styles.active : null} onClick={()=>{this.setState({tradeType:2})}}>生物制品</li>
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