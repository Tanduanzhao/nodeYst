import React,{Component} from 'react';
import {connect} from 'react-redux';
import FooterBar from './footerBar';
import {Link} from 'react-router';
import {loadHome} from './function/ajax';
import $ from 'jquery';

 class Vip extends Component{
	 constructor(props){
		 super(props);
	 }
	 componentDidMount(){
	 }
	render(){
		return(
			<div className="root vip">
				<img src="/images/vip_header.jpg" alt=""/>
				<img src="/images/time_vip_title.jpg" alt=""/>
				<img src="/images/time_vip_content.jpg" alt=""/>
				<img src="/images/only_vip_title.jpg" alt=""/>
				<img src="/images/only_vip_content.jpg" alt=""/>
				<img src="/images/join_vip_title.jpg" alt=""/>
				<img src="/images/join_vip_content.jpg" alt=""/>
				<img src="/images/close.png" alt="" className="close"/>
			</div>
		)
	}
}

function select(state){
	return{
		userInfo:state.userInfo
	}
}
export default connect(select)(Vip);
