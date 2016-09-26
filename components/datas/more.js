import React, {Component}from 'react';
import {Link} from 'react-router';
export default class More extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show:false
		};
	}
	render() {
		return (
			<div className="more"  onClick={()=>{(this.state.show)?this.setState({show:false}): this.setState({show:true})}}
			>
				<div>更多</div>
				<div>功能</div>
				<div className="more-content" style={(this.state.show) ? styles.active :styles.hidden}>
					<a href="#">首页</a>
					<a href="#">报告</a>
					<a href="#">行情</a>
					<a href="#">中标数据</a>
					<a href="#">广东省入市价</a>
					<a href="#">产品数据</a>
					<span></span>
				</div>
			</div>
		)
	}
}
const styles = {
	active:{
		display:'block',
		color:'#000'
	},
	hidden:{
		display:'none',
		color:'#000'
	}
}