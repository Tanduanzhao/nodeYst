import React,{Component} from 'react';
import NormalHeaderBar from './normalHeaderBar.js';
import {loadIndex} from './function/ajax.js';
export default class Provicen extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	areaId:this.props.areaId,
	  	areaName:this.props.areaName,
        searchAreaType:this.props.searchAreaType
	  };
	}
	_sureButton(){
		this.props.dispatch({
			type:'UNSHOW'
		});
		this.props.dispatch({
			type:'CHANGE',
			areaName:this.state.areaName,
			areaId:this.state.areaId,
            searchAreaType:this.state.searchAreaType
		});
        console.log(this.state.searchAreaType);
        loadIndex(this.props.dispatch,{
            yearMonth:this.props.yearMonth,
            areaId:this.state.areaId,
            searchAreaType:this.state.searchAreaType,
            callBack:(res)=>{
                this.props.dispatch({
                     type:'LOADDATA',
                     data:res.datas
                });
            }
        })
	}
	_cancelButton(){
		this.props.dispatch({
			type:'UNSHOW'
		})
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
                        <NormalHeaderBar cancelButton={this._cancelButton.bind(this)} sureButton={this._sureButton.bind(this)} title="请选择省份"/>
                        <div className="scroll-content has-header padding" style={{backgroundColor:'#fff'}}>
                            {
                                this.props.dataSources.map((ele)=>{
                                    return(
                                        <div key={ele.id}>
                                            <h3 className="list-horizontal-title"><span>{ele.areaName}</span></h3>
                                            <ul className="list-horizontal-block">
                                            {
                                                ele.children.map((v)=>{
                                                    return	<li style={(v.id == this.state.areaId) ? styles.active : null} onClick={this._spanhandleClick.bind(this,v.id,v.areaName,v.searchAreaType)} key={v.id}>{v.areaName}</li> 
                                                })
                                            }
                                            </ul>
                                        </div>
                                    )
                                })
                            }
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
	}
}

