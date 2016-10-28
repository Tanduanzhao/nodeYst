import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import FooterBar from './footerBar';
import {Link} from 'react-router';
import {loadHome,loadUserInfo} from './function/ajax';
import {OpenProductView} from './function/common';
import Popup from './popup';

 class Vip extends Component{
	 constructor(props){
		 super(props);
         this.state={
             showPopup:false
         };
	 }
     _pushHandle(){
         this.context.router.goBack();
     }
     _ProductView(id,sele){
         if(!this.refs.checkbox.checked){
             alert("请同意服务协议")
             return false
         }
         OpenProductView(id,()=>{loadUserInfo({
             callBack:(res)=>{
                 this.props.dispatch({
                     type:'LOADUSERINFO',
                     imgUrl:res.datas.imgUrl,
                     id:res.datas.id,
                     userName:res.datas.userName,
                     isVip:res.datas.userVip
                 });
                 this.setState({
                     showPopup:true
                 });
             }
         })}
         )
     }
     _popupCancel(){
         this.setState({
             showPopup:false
         })
     }
     _popupSure() {
         //this.setState({
         //    showPopup: false
         //});
         this.context.router.push('/center');
     }
	render(){
		return(
			<div className="root vip">
				<div className="scroll-content">
                    {
                        this.state.showPopup ? <Popup  {...this.props} popupCancel={this._popupCancel.bind(this)} popupSure={this._popupSure.bind(this)}/> : null
                    }
				    <div className="banner">
                        <img src="images/vip_header.jpg"/>
                        <button className="close" onClick={this._pushHandle.bind(this)}></button>
                    </div>
                    <div className="level">
                        <h3>需开通会员后才能查看数据<br/>如已开通再次购买将叠加会员期限</h3>
                        <ul className="row">
                            <li className="col-80">
                                <ul className="row">
                                <li className="col-20"><img src="images/level.jpg" alt=""/></li>
                                <li className="col-50"><span>月度 有效期1个月</span></li>
                                <li className="col"><img className="level-price" src="images/level_price.jpg" alt=""/></li>
                                </ul>
                            </li>
                            <li className="col-20"><button className="col"  onClick={this._ProductView.bind(this,"pxFGiwzFAD8mjP9sPRv416VBs3Is")}>立即开通</button></li>
                        </ul>
                        <ul className="row">
                            <li className="col-80">
                                <ul className="row">
                                    <li className="col-20"><img src="images/level02.jpg" alt=""/></li>
                                    <li className="col-50"><span>季度 有效期3个月</span></li>
                                    <li className="col"><img className="level-price" src="images/level_price02.jpg" alt=""/></li>
                                </ul>
                            </li>
                            <li className="col-20"><button className="col"  onClick={this._ProductView.bind(this,"pxFGiw7CWclXnIvqF6JqlcguRc-8")}>立即开通</button></li>
                        </ul>
                        <ul className="row">
                            <li className="col-80">
                                <ul className="row">
                                    <li className="col-20"><img src="images/level03.jpg" alt=""/></li>
                                    <li className="col-50"><span>年度 有效期1年</span></li>
                                    <li className="col"><img className="level-price" src="images/level_price03.jpg" alt=""/></li>
                                </ul>
                            </li>
                            <li className="col-20"><button className="col"  onClick={this._ProductView.bind(this,"pxFGiwyfqw59qONiyD5Gq5Ro__2g")}>立即开通</button></li>
                        </ul>
                        <ul className="row">
                            <li className="col-80">
                                <ul className="row">
                                    <li className="col-20"><img src="images/level04.jpg" alt=""/></li>
                                    <li className="col-50"><span>超级VIP 有效期1年</span></li>
                                    <li className="col"><img className="level-price" src="images/level_price04.jpg" alt=""/></li>
                                </ul>
                            </li>
                            <li className="col-20"><button className="col"  onClick={this._ProductView.bind(this,"pxFGiwyfqw59qONiyD5Gq5Ro__2g")}>立即开通</button></li>
                        </ul>
                        <div className="protocol"><input ref="checkbox" type="checkbox" defaultChecked/>我已阅读并同意 <Link to="vip/protocol">《药市通会员服务协议》 </Link></div>
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
