import React, {Component}from 'react';
import {Link} from 'react-router';
export default class GotTop extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="function ">
				<div className="gotop"  onClick={this.props.scrollTop}></div>
				<div  className={(this.props.isKeep != 1) ? "unCollect": "collect"} onClick={this.props.keepReport}></div>
			</div>
		)
	}
}