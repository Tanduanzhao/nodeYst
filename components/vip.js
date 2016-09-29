import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import FooterBar from './footerBar';
import {Link} from 'react-router';
import {loadHome} from './function/ajax';

 class Vip extends Component{
	 constructor(props){
		 super(props);
	 }
     _pushHandle(){
         this.context.router.goBack();
     }
	render(){
		return(
			<div className="root vip">
				<div className="scroll-content">
				    <div className="banner">
                        <img src="images/vip_header.jpg"/>
                        <button className="close" onClick={this._pushHandle.bind(this)}></button>
                    </div>
                    <div className="level">
                        <h3>需开通会员后才能查看数据<br/>请选择开通会员的期限</h3>
                        <ul className="level-list">
                            <li>
                                <img src="images/level.jpg" alt=""/>
                                 <span>1个月</span>
                                <img className="level_price" src="images/level_price.jpg" alt=""/>
                                <button className="level_1">立即开通</button>
                            </li>
                            <li>
                                <img src="images/level.jpg" alt=""/>
                                <span>3个月</span>
                                <img className="level_price" src="images/level_price02.jpg" alt=""/>
                                <button className="level_2">立即开通</button>
                            </li>
                            <li>
                                <img src="images/level.jpg" alt=""/>
                                <span>12个月</span>
                                <img className="level_price" src="images/level_price03.jpg" alt=""/>
                                <button className="level_3">立即开通</button>
                            </li>
                        </ul>
                    </div>
                    <div className="pk">
                        <img src="/images/bg_pk_vip.jpg"/>
                    </div>
				</div>
			</div>
		)
	}
}

function select(state){
	return{
		userInfo:state.userInfo
	}
}
Vip.contextTypes = {
    router:React.PropTypes.object.isRequired
}
export default connect(select)(Vip);
