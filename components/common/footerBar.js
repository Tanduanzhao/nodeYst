import React,{Component}from 'react';

import FooterBarIcon from './footerBarIcon.js';
export default class FooterBar extends Component {
	render() {
		var menus = [{
			uri: '/',
			title: '首页',
			icon: 'ios-home'
		}, {
			uri: 'report',
			title: '报告',
			icon: 'document-text',
			fn:()=>{
				this.props.dispatch({
					type:'CHANGETYPE',
					searchType:1,
					reportType:0
				});
				this.props.dispatch({
					type:'RESETREPORT'
				})
				if(typeof this.props.resetReport != 'undefined'){
					this.props.resetReport()
				}
				this.props.dispatch({
					type:'RESETSEARCH'
				})
			}
		}, {
			uri: 'datas',
			title: '数据',
			icon: 'stats-bars'
		}, {
			uri: 'search',
			title: '搜索',
			icon: 'search',
			fn:()=>{
				this.props.dispatch({
					type:'CHANGESMALLTYPE',
					smallType:"搜索首页"
				});
				this.props.dispatch({
					type:'RESETSEARCH'
				})
			}
		},
			{
			uri: 'center',
			title: '个人中心',
			icon: 'happy',
			active:{
				color:"red"
			}
		}];
		return (
			<div className="tabs tabs-icon-top">
					{
						menus.map((ele) => {
							return (
								//style={ele.uri == this.props.routes[1].path ? ele.icon : null}
							<FooterBarIcon style={ele.uri == this.props.routes[1].path || (this.props.active == ele.uri ) ? styles.active : null} key={ele.title}  {...ele}/>
							)
						})
					}
				</div>
		)
	}
}
FooterBar.propTypes = {
    routes:React.PropTypes.array.isRequired
}
const styles = {
	active:{
		//color:'#fff'
		color:'#0284D0'
	}
}