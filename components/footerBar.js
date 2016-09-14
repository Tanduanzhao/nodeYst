import React, {
	Component,
    propsTypes
}
from 'react';

import FooterBarIcon from './footerBarIcon.js';
export
default class FooterBar extends Component {
	_footerBarHandle(e){
		this.props.dispatch({
			type:'ROUTER',
			router:e
		})
	}
    componentDidMount(){
        console.log(this.props.routes[0].path);
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
								<FooterBarIcon fn={this._footerBarHandle.bind(this,ele.uri)} style={ele.uri == this.props.routes[0].path ? styles.active : null} key={ele.title}  {...ele}/>
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