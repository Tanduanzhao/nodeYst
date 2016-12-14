import React,{Component} from 'react';
import NormalHeaderBar from './../common/normalHeaderBar';
export default class FilterGroups extends Component{
  constructor(props) {
    super(props);
    this.state = {
      columnBigType:this.props.columnBigType || null
    };
  }
  _cancelButton(){
    this.props.hideFilter()
  }
  _sureButton(){
    this.props.fn(this.state);
  }
  _changeFactoryNumber(){
    console.log(this.refs.maxFactoryNumber.value,"value");
    this.props.dispatch({
      type:'CHANGEFACTORYNUMBER',
      min:this.refs.minFactoryNumber.value,
      max:this.refs.maxFactoryNumber.value
    })
  }
  render(){
    return(
      <div className="modal-backdrop">
        <div className="modal-backdrop-bg"></div>
        <div className="modal">
          <NormalHeaderBar cancelButton={this._cancelButton.bind(this)} sureButton={this._sureButton.bind(this)} title="请选择"/>
          <div className="scroll-content has-header" style={{backgroundColor:'#fff'}}>
            <h2 className="item item-divider">分组厂家数</h2>
            <div className="list padding row factoryNumber">
              <input ref="minFactoryNumber" className="minFactoryNumber" onChange={this._changeFactoryNumber.bind(this)} type="text"/>
              <span>一</span>
              <input ref="maxFactoryNumber" className="maxFactoryNumber" onChange={this._changeFactoryNumber.bind(this)} type="text"/>
            </div>
            <h2 className="item item-divider">目录类型</h2>
            <div className="list padding">
              <ul className="list-horizontal-block">
                <li style={(this.state.columnBigType == null) ? styles.active : null} onClick={()=>{this.setState({columnBigType:null})}}>第一层次</li>
                <li style={(this.state.columnBigType == 0) ? styles.active : null} onClick={()=>{this.setState({columnBigType:0})}}>第二层次</li>
                <li style={(this.state.columnBigType == 1) ? styles.active : null} onClick={()=>{this.setState({columnBigType:1})}}>第三层次</li>
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