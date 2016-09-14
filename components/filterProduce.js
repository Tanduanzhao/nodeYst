import React,{Component} from 'react';
import NormalHeaderBar from './normalHeaderBar';
export default class ilterProduce extends Component{
    constructor(props) {
	  super(props);
	  this.state = {
	  	areaId:this.props.hospitalFilter.areaId,
	  	areaName:this.props.hospitalFilter.areaName,
        searchAreaType:this.props.hospitalFilter.searchAreaType,
        yearMonth:this.props.hospitalFilter.yearMonth,
        hospitalLevel:this.props.hospitalFilter.hospitalLevel
	  };
	}
    _cancelButton(){
        this.props.dispatch({
            type:'UNSHOWFILTER'
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
                       <h2 className="item item-divider">报告种类</h2>
                       <div className="list padding">
                            <ul className="list-horizontal-block">
                               <li style={(this.state.hospitalLevel == null) ? styles.active : null} onClick={()=>{this.setState({hospitalLevel:null})}}>全部</li>
                               <li style={(this.state.hospitalLevel == 1) ? styles.active : null} onClick={()=>{this.setState({hospitalLevel:1})}}>行业报告</li>
                               <li style={(this.state.hospitalLevel == 2) ? styles.active : null} onClick={()=>{this.setState({hospitalLevel:2})}}>品类报告</li>
                               <li style={(this.state.hospitalLevel == 4) ? styles.active : null} onClick={()=>{this.setState({hospitalLevel:4})}}>处方分析</li>
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