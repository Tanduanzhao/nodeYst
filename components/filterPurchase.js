import React,{Component} from 'react';
import NormalHeaderBar from './normalHeaderBar';
export default class FilterProduce extends Component{
  constructor(props) {
    super(props);
    this.state = {
      areaId:this.props.purchase.areaId,
      areaName:this.props.purchase.areaName,
      searchAreaType:this.props.purchase.searchAreaType,
      yearMonth:this.props.purchase.yearMonth,
      produceType:this.props.purchase.produceType
    };
  }
  _cancelButton(){
    this.props.dispatch({
      type:'UNSHOWFILTERPRODUCE'
    });
  }
  _sureButton(){
    console.log(this.state.produceType);
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
                    this.props.purchase.ReportTypeDate.map((ele,index)=>{
                      return(
                          <li key={index} style={(this.state.reportType == ele.typeName) ? styles.active : null} onClick={()=>{this.setState({reportType:ele.typeName})}}>{ele.typeName}</li>
                      )
                    })
                  }
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