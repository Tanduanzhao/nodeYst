/*
    个人中心模块
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
import FooterBar from './footerBar';
import {Link} from 'react-router';
import {loadUserInfo} from './function/ajax';
class Center extends Component{
    componentDidMount(){
        loadUserInfo({
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADUSERINFO',
                    datas:res.datas
                });
            }
        })
    }
    render(){
        return(
            <div className="root">
                <Main {...this.props}/>
                <FooterBar {...this.props}/>
            </div>
        )
    }
}

class Main extends Component{
    render(){
        return(
            <div className="scroll-content">
                <div className="list">
                    <div className="item item-avatar">
                        <img src={this.props.userInfo.imgUrl} width="80"/>
                        <h2>微信用户</h2>
                        <p>{this.props.userInfo.userName} <span className="tag bg-assertive">VIP</span></p>
                    </div>
                </div>
                <div className="list padding-top">
                    <div className="item item-icon-left">
                        <i className="icon ion-ios-cloud-upload-outline"></i>
                        我要投稿
                    </div>
                    <div className="item item-icon-left">
                        <i className="icon ion-ios-cart-outline"></i>
                        已购报告
                    </div>
                    <Link to="center/feedback" className="item item-icon-left">
                        <i className="icon ion-ios-chatboxes-outline"></i>
                        意见反馈
                    </Link>
                    <div className="item item-icon-left">
                        <i className="icon ion-ios-help-outline"></i>
                        帮助中心
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
export default connect(select)(Center);