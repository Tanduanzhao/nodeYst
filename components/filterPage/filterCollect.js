import React,{Component} from 'react';
import NormalHeaderBar from './../common/normalHeaderBar';
export default class FilterCollect extends Component{
  constructor(props) {
    super(props);
    this.state = {
      searchAreaType:this.props.dataSources.searchAreaType,
      reportType:this.props.dataSources.reportType,
      searchType:this.props.dataSources.searchType,
      active:this.props.dataSources.active,
      sord:this.props.dataSources.sord,
      sidx:this.props.dataSources.sidx,
      costStatus:this.props.dataSources.costStatus,
      dataSourcesTag:this.props.dataSources.reportTag,
      columnBigType:this.props.dataSources.columnBigType
    };
  }
  _cancelButton(){
    this.props.dispatch({
      type:'UNSHOWFILTERPRODUCE'
    });
  }
  _sureButton(){
    this.props.fn(this.state);
  }
  render(){
    console.log(this.state.active,"active");
    return(
      <div className="modal-backdrop">
        <div className="modal-backdrop-bg"></div>
        <div className="modal">
          <NormalHeaderBar cancelButton={this._cancelButton.bind(this)} sureButton={this._sureButton.bind(this)} title="请选择"/>
          <div className="scroll-content has-header" style={{backgroundColor:'#fff'}}>
            <h2 className="item item-divider">筛选类型</h2>
            <div className="list padding">
              <ul className="list-horizontal-block">
                <li style={(this.state.columnBigType == null) ? styles.active : null} onClick={()=>{this.setState({columnBigType:null})}}>全部</li>
                <li style={(this.state.columnBigType == 0) ? styles.active : null} onClick={()=>{this.setState({columnBigType:0})}}>分析报告</li>
                <li style={(this.state.columnBigType == 1) ? styles.active : null} onClick={()=>{this.setState({columnBigType:1})}}>专栏订阅</li>
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
};