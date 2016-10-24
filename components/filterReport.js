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
      reportType:this.props.report.reportType,
      searchType:this.props.report.searchType,
      active:this.props.report.active,
      sord:this.props.report.sord,
      sidx:this.props.report.sidx,
      costStatus:this.props.report.costStatus
    };
  }
  _cancelButton(){
    this.props.dispatch({
      type:'UNSHOWFILTERPRODUCE'
    });
  }
  _sureButton(){
    console.log(this.state.searchType);
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
                {
                  this.props.report.ReportTypeDate.map((ele,index)=>{
                    return(
                        <li key={index} style={(this.state.reportType == ele.id) ? styles.active : null} onClick={()=>{this.setState({reportType:ele.id})}}>{ele.typeName}</li>
                    )
                  })
                }
              </ul>
            </div>
            <h2 className="item item-divider">报告类型</h2>
            <div className="list padding">
              <ul className="list-horizontal-block">
                <li style={(this.state.searchType == 1) ? styles.active : null} onClick={()=>{this.setState({searchType:1})}}>全部</li>
                <li style={(this.state.searchType == 0) ? styles.active : null} onClick={()=>{this.setState({searchType:0})}}>最新报告</li>
                <li style={(this.state.searchType == 2) ? styles.active : null} onClick={()=>{this.setState({searchType:2})}}>热门报告</li>
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
            <h2 className="item item-divider">费用类型</h2>
            <div className="list padding">
              <ul className="list-horizontal-block">
                <li style={(this.state.active == null) ? styles.active : null} onClick={()=>{this.setState({costStatus:null})}}>全部</li>
                <li style={(this.state.active == 1) ? styles.active : null} onClick={()=>{this.setState({costStatus:1})}}>免费报告</li>
                <li style={(this.state.active == 0) ? styles.active : null} onClick={()=>{this.setState({costStatus:0})}}>收费报告</li>
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