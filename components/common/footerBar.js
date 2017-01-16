import React, {
	Component,
    propsTypes
}
from 'react';

import FooterBarIcon from './footerBarIcon.js';
export
default class FooterBar extends Component {
    componentDidMount(){
        console.dir(this.props.routes);
    }
	render() {
		var menus = [{
			uri: '/',
			title: '首页',
			icon: 'ios-home'
		}, {
			uri: 'report',
			title: '报告',
			icon: 'cube',
			fn:()=>{
				this.props.dispatch({
					type:'CHANGETYPE',
					searchType:1,
					reportType:0
				});
				//this.props.dispatch({
				//	type:'CHAGNGEFIXEDSCROLL',
				//	fixedScroll:1
				//})
				//this.props.dispatch({
				//	type: 'RESETREPORT'
				//});
			}
		}, {
			uri: 'market',
			title: '行情',
			icon: 'earth'
		}, {
			uri: 'datas',
			title: '数据',
			icon: 'erlenmeyer-flask'
		}, {
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
							<FooterBarIcon style={ele.uri == this.props.routes[1].path ? styles.active : null} key={ele.title}  {...ele}/>
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
		color:'#0284D0'
	}
}