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
			uri: 'home',
			title: '首页',
			icon: 'ios-home'
		}, {
			uri: 'produce',
			title: '报告',
			icon: 'cube'
		}, {
			uri: '/',
			title: '行情',
			icon: 'earth'
		}, {
			uri: 'datas',
			title: '数据',
			icon: 'erlenmeyer-flask'
		}, {
			uri: 'center',
			title: '个人中心',
			icon: 'happy'
		}];
		return (
			<div className="tabs tabs-icon-top">
					{
						menus.map((ele) => {
							return (
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