import React,{Component} from 'react';
import NormalHeaderBar from './common/normalHeaderBar.js';
import {loadIndex} from './function/ajax.js';
export default class Provicen extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	areaId:this.props.areaId,
	  	areaName:this.props.areaName,
        searchAreaType:this.props.searchAreaType,
		  parentName:this.props.areaName,
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
        this.props.fn(this.state);
	}
	_cancelButton(){
		this.props.dispatch({
			type:'UNSHOW'
		})
	}
	_spanhandleClick(id,e,t,parent){
		switch(parent){
			case "广东省" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:50}); break;
			case "江苏省" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:51}); break;
			case "北京市" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:52}); break;
			case "山东省" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:53}); break;
			case "山西省" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:54}); break;
			case "安徽省" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:55}); break;
			case "江西省" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:56}); break;
			case "河南省" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:57}); break;
			case "湖北省" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:58}); break;
		}
		this.setState({
			areaId :id,
			areaName: e,
            searchAreaType:t,
			parentName:parent,
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
                                                    return	<li style={(v.id == this.state.areaId) ? styles.active : null} onClick={this._spanhandleClick.bind(this,v.id,v.showAreaName,v.searchAreaType,ele.showAreaName)} key={v.id}>{v.areaName}</li>
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

