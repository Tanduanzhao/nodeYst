import React,{Component} from 'react';
import NormalHeaderBar from './../common/normalHeaderBar';
export default class FilterProduce extends Component{
  constructor(props) {
    super(props);
    this.state = {
      costStatus:this.props.dataSources.costStatus,
      column:this.props.dataSources.column
    };
  }
  _cancelButton(){
    this.props.dispatch({
      type:'UNSHOWFILTERPSUBSCRIBEPAGE'
    });
  }
  _sureButton(){
    console.log(this.state.reportTag);
    this.props.fn(this.state);
  }
  render(){
    console.log(this.state.costStatus,"active");
    return(
      <div className="modal-backdrop">
        <div className="modal-backdrop-bg"></div>
        <div className="modal">
          <NormalHeaderBar cancelButton={this._cancelButton.bind(this)} sureButton={this._sureButton.bind(this)} title="请选择"/>
          <div className="scroll-content has-header" style={{backgroundColor:'#fff'}}>
            <h2 className="item item-divider">专栏栏目</h2>
            <div className="list padding">
              <ul className="list-horizontal-block">
                {
                  this.props.dataSources.subscribeTypeDate.map((ele,index)=>{
                    return(
                        <li key={index} style={(this.state.column == ele.id) ? styles.active : null} onClick={()=>{this.setState({column:ele.id})}}>{ele.typeName}</li>
                    )
                  })
                }
              </ul>
            </div>
            <h2 className="item item-divider">费用类型</h2>
            <div className="list padding">
              <ul className="list-horizontal-block">
                <li style={(this.state.costStatus == null) ? styles.active : null} onClick={()=>{this.setState({costStatus:null})}}>全部</li>
                <li style={(this.state.costStatus == 0) ? styles.active : null} onClick={()=>{this.setState({costStatus:0})}}>免费</li>
                <li style={(this.state.costStatus == 1) ? styles.active : null} onClick={()=>{this.setState({costStatus:1})}}>收费</li>
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