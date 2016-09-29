import React,{Component} from 'react';
import NormalHeaderBar from './normalHeaderBar';
export default class FilterProduce extends Component{
  constructor(props) {
    super(props);
    this.state = {
      areaId:this.props.report.areaId,
      areaName:this.props.report.areaName,
      searchAreaType:this.props.report.searchAreaType,
      yearMonth:this.props.report.yearMonth,
      produceType:this.props.report.produceType
    };
  }
  _cancelButton(){
      console.log('canel');
    this.props.dispatch({
      type:'UNSHOWFILTERPRODUCE'
    });
  }
  _sureButton(){
    this.props.fn(this.state);
  }
  _spanhandleClick(id,e,t){
    this.setState({
      areaId :id,
      areaName: e,
      searchAreaType:t,
      searchType: null
    })
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
              <ul className="list-horizontal-block">
                <li style={(this.state.produceType == null) ? styles.active : null} onClick={()=>{this.setState({produceType:null})}}>全部</li>
                <li style={(this.state.produceType == 1) ? styles.active : null} onClick={()=>{this.setState({produceType:1})}}>行业报告</li>
                <li style={(this.state.produceType == 2) ? styles.active : null} onClick={()=>{this.setState({produceType:2})}}>品类报告</li>
                <li style={(this.state.produceType == 4) ? styles.active : null} onClick={()=>{this.setState({produceType:4})}}>处方分析</li>
              </ul>
            </div>
            <h2 className="item item-divider">报告类型</h2>
            <div className="list padding">
              <ul className="list-horizontal-block">
                <li style={(this.state.searchType == null) ? styles.active : null} onClick={()=>{this.setState({searchType:null})}}>全部</li>
                <li style={(this.state.searchType == 1) ? styles.active : null} onClick={()=>{this.setState({searchType:1})}}>最新报告</li>
                <li style={(this.state.searchType == 2) ? styles.active : null} onClick={()=>{this.setState({searchType:2})}}>热门报告</li>
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