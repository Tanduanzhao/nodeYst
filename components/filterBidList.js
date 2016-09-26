import React,{Component} from 'react';
import NormalHeaderBar from './normalHeaderBar';
export default class FilterProduce extends Component{
  constructor(props) {
    super(props);
    this.state = {
      produceType:this.props.bidList.produceType
    };
  }
  _cancelButton(){
    this.props.dispatch({
      type:'UNSHOWFILTERPBIDLIST'
    })
  }
  _sureButton(){
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
            <h2 className="item item-divider">区域选择</h2>
            <div className="list padding">
              {
                this.props.provicenData.map((ele)=>{
                  if(true){
                    return(
                        <div key={ele.id}>
                          <h3 className="list-horizontal-title"><span>{ele.areaName}</span></h3>
                          <ul className="list-horizontal-block">
                            {
                              ele.children.map((v)=>{
                                if (this.state.municipality == 1){
                                  if( v.municipality != null && v.municipality != undefined){
                                    return <li style={(v.id == this.state.areaId) ? styles.active : null} onClick={this._spanhandleClick.bind(this,v.id,v.areaName,v.searchAreaType)} key={v.id}>{v.areaName}</li>
                                  }
                                }else{
                                  return <li style={(v.id == this.state.areaId) ? styles.active : null} onClick={this._spanhandleClick.bind(this,v.id,v.areaName,v.searchAreaType)} key={v.id}>{v.areaName}</li>
                                }
                              })
                            }
                          </ul>
                        </div>
                    )
                  }
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
class Time extends Component{
  constructor(props){
    super(props);
    this.state={
      yearMonth:this.props.hospitalFilter.yearMonth
    }
  }
  render(){
    if(!this.props.hospital){
      return(
          <div>
            <h2 className="item item-divider">时间选择</h2>
            <div className="list padding">
              <ul className="list-horizontal-block">
                <li style={(this.state.yearMonth == null) ? styles.active : null} onClick={()=>{this.setState({yearMonth:null})}}>全部</li>
                <li style={(this.state.yearMonth == 2016) ? styles.active : null} onClick={()=>{this.setState({yearMonth:2016})}}>2016</li>
                <li style={(this.state.yearMonth == 2015) ? styles.active : null} onClick={()=>{this.setState({yearMonth:2015})}}>2015</li>
                <li style={(this.state.yearMonth == 2014) ? styles.active : null} onClick={()=>{this.setState({yearMonth:2014})}}>2014</li>
                <li style={(this.state.yearMonth == 2013) ? styles.active : null} onClick={()=>{this.setState({yearMonth:2013})}}>2013</li>
                <li style={(this.state.yearMonth == 2012) ? styles.active : null} onClick={()=>{this.setState({yearMonth:2012})}}>2012</li>
              </ul>
            </div>
          </div>
      )
    }else{
      return null
    }
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