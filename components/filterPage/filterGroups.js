import React,{Component} from 'react';
import NormalHeaderBar from './../common/normalHeaderBar';
export default class FilterGroups extends Component{
  constructor(props) {
    super(props);
  }
  _cancelButton(){
    this.props.hideFilter()
  }
  _sureButton(){
    this.props.fn();
  }
  render(){
    return(
      <div className="modal-backdrop">
        <div className="modal-backdrop-bg"></div>
        <div className="modal">
          <NormalHeaderBar cancelButton={this._cancelButton.bind(this)} sureButton={this._sureButton.bind(this)} title="请选择"/>
          <div className="scroll-content has-header" style={{backgroundColor:'#fff'}}>
            <h2 className="item item-divider">报告种类</h2>
            <div className="list padding">
              
            </div>
            <h2 className="item item-divider">厂家数</h2>
            <div className="list padding row">
              <div className="row">
                  <input type="text"/>
              </div>
              <div className="row">
                  -
              </div>
              <div className="row">
                  <input type="text"/>
              </div>
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