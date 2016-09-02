import React, {
	Component
}
from 'react';
require('../scss/style.scss');

import {loadIndex} from './function/ajax.js';
export
default class HeaderBar extends Component {
	constructor(props) {
	  super(props);
        console.log(this.props);
    
	}
	_showProvicenHandle(){
		this.props.dispatch({
			type:'SHOW'
		});
	}
	_increaseHandle(){
        var yearMonth = this.props.yearMonth;
		this.props.dispatch((dispatch)=>{
            loadIndex(dispatch,{
                yearMonth:++yearMonth,
                areaId:this.props.areaId,
                searchAreaType:this.props.searchAreaType,
                callBack:function(res){
                    dispatch({
                         type:'LOADDATA',
                         data:res.datas
                    });
                    dispatch({
                        type:'INCREASE'
                    });
                }
            })
        })
	}
	_decreaseHandle(){
		var yearMonth = this.props.yearMonth;
		this.props.dispatch((dispatch)=>{
            loadIndex(dispatch,{
                yearMonth:--yearMonth,
                areaId:this.props.areaId,
                searchAreaType:this.props.searchAreaType,
                callBack:function(res){
                    dispatch({
                         type:'LOADDATA',
                         data:res.datas
                    });
                    dispatch({
                        type:'DECREASE'
                    });
                }
            })
        })
	}
	render() {
		return (
			<div className="bar bar-header bar-positive">
                <div className="buttons">
                    <button className="button" onClick={this._showProvicenHandle.bind(this)}><i className="fa fa-map-marker"></i><span style={{paddingLeft:'5px'}}>{this.props.areaName}</span></button>
                </div>
				<h4 className="title">{this.props.title}</h4>
				<div className="buttons">
                    <button onClick={this._decreaseHandle.bind(this)} className="button button-icon icon ion-arrow-left-b"></button>
                    <div className="button">{this.props.yearMonth}</div>
                    <button onClick={this._increaseHandle.bind(this)} className="button button-icon icon ion-arrow-right-b"></button>
                </div>
			</div>
		)
	}
}
