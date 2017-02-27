/*头部导航条*/
import React, {Component}from 'react';
import {Link} from 'react-router';
import {loadIndex} from './../function/ajax.js';

export default class HeaderBar extends Component {
	constructor(props) {
	  super(props);
	}
	render() {
		return (
			<div  ref="headerBar" className={`bar bar-header bar-positive item-input-inset flex-jc-space ${this.props.isOpacity ? 'bar-opacity' : ""}`} style={{zIndex:3,backgroundColor:`rgba(56,126,245,${typeof this.props.opacityNum !== 'undefined' ? this.props.opacityNum:1})`}}>
				<div className="flex-center" onClick={this.props.showIntro}>
					{typeof this.props.showIntro != 'undefined' ?<img src="/images/icon_introduce.png" style={{width:'1.125rem',height: '1.125rem',margin:'0 5px'}} /> : null}
					{this.props.titleName}{typeof this.props.icoType != 'undefined' && this.props.icoType != "" ? "+"+this.props.icoType : ""}
				</div>
				<div className="buttons">
					{
						typeof this.props.showFilter != 'undefined'
							? <div  className="flex-center" onClick={this.props.showFilter}>
								<img src="/images/filter.png" style={{width:'1.125rem',height: '1.125rem'}} />
								<span  style={{margin:' 0 5px'}}>筛选</span>
						      </div>
							:null
					}
					{
						typeof this.props.showSearch != 'undefined'
							? <button className="button"  onClick={this.props.showSearch}>
								<i className="icon ion-search"></i>
						      </button>
							:null
					}
					{
						typeof this.props.showProvicenHandle != 'undefined'
							? <button className="button" onClick={this.props.showProvicenHandle}><i className="fa fa-map-marker"></i><span style={{paddingLeft:'5px'}}>{this.props.areaName}</span></button>
							: null
					}
					{
						typeof this.props.decreaseHandle != 'undefined'
							? <button onClick={this.props.decreaseHandle} className="button button-icon icon ion-arrow-left-b"></button>
							: null
					}
					{
						typeof this.props.decreaseHandle != 'undefined'|| typeof this.props.increaseHandle != 'undefined'
							? <div className="button">{this.props.yearMonth}</div>
							: null
					}
					{
						typeof this.props.increaseHandle != 'undefined'
							? <button onClick={this.props.increaseHandle} className="button button-icon icon ion-arrow-right-b"></button>
							: null
					}

				</div>
			</div>
		)
	}
}
