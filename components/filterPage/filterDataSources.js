import React,{Component} from 'react';
import NormalHeaderBar from './../common/normalHeaderBar';
import {valINarr} from './../function/common';
export default class FilterGroups extends Component{
  constructor(props) {
    super(props);
    this.state = {
      provinceIds:this.props.provinceIds
    };
  }
  _cancelButton(){
    this.props.hideFilter()
  }
  _sureButton(){
    this.props.fn(this.state);
  }
  _spanhandleClick(id,name){
      if(id == '0'){
          this.setState({
            provinceIds:['0']
          });
      }else{
          if(this.state.provinceIds.indexOf('0') != -1){
              this.setState({
                provinceIds:valINarr(this.state.provinceIds,'0')
              });
          }
          this.setState({
              provinceIds:valINarr(this.state.provinceIds,id)
          });
      }
       
      
  }
  render(){
    return(
      <div className="modal-backdrop">
        <div className="modal-backdrop-bg"></div>
        <div className="modal">
          <NormalHeaderBar cancelButton={this._cancelButton.bind(this)} sureButton={this._sureButton.bind(this)} title="请选择"/>
          <div className="scroll-content has-header" style={{backgroundColor:'#fff'}}>
            <h2 className="item item-divider">省份</h2>
            <div className="list padding">
                <ul className="list-horizontal-block">
                    {
                        this.props.provinces.map((v)=>{
                            return <li style={(this.state.provinceIds.indexOf(v.provinceId) != -1) ? styles.active : null} onClick={this._spanhandleClick.bind(this,v.provinceId,v.biaozhunshengfen)} key={v.provinceId}>{v.biaozhunshengfen}</li>
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