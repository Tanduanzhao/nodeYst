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
    
	}
	_showProvicenHandle(){
		this.props.dispatch({
			type:'SHOW'
		});
	}
	render() {
		return (
			<div className="bar bar-header bar-positive" ref="headerBar">
                <div className="buttons">
                    <button className="button" onClick={this._showProvicenHandle.bind(this)}><i className="fa fa-map-marker"></i><span style={{paddingLeft:'5px'}}>{this.props.areaName}</span></button>
                </div>
				<h4 className="title">{this.props.title}</h4>
				<div className="buttons">
                    <button onClick={this.props.decreaseHandle} className="button button-icon icon ion-arrow-left-b"></button>
                    <div className="button">{this.props.yearMonth}</div>
                    <button onClick={this.props.increaseHandle} className="button button-icon icon ion-arrow-right-b"></button>
                </div>
			</div>
		)
	}
}
