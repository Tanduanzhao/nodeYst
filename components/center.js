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
                    <div className="item item-avatar bg_center">
                        <img style={{top:"30px", left:"35px"}} src={this.props.userInfo.imgUrl} width="80"/>
                        <h2>微信用户</h2>
                        <p>
                            {this.props.userInfo.userName}
                            {
                                this.props.userInfo.isVip?<img className="vipLogo" src="/images/vipLogo.png" alt=""/>:<img className="vipLogo" src="/images/mass.png" alt=""/>
                            }
                        </p>
                    </div>
                </div>
                <div className="list center-viwe">
                    <div className="item item-icon-left">
                        <img src="/images/open_icon.jpg" alt=""/>
                        开通会员
                    </div>
                    <div className="item item-icon-left">
                        <img src="/images/contribute_icon.jpg" alt=""/>
                        我要投稿
                    </div>
                    <Link to="purchase" className="item item-icon-left">
                        <img src="/images/purchase_icon.jpg" alt=""/>
                        已购报告
                    </Link>
                    <Link to="center/feedback" className="item item-icon-left">
                        <img src="/images/idea_icon.jpg" alt=""/>
                        意见反馈
                    </Link>
                    <div className="item item-icon-left">
                        <img src="/images/help_icon.jpg" alt=""/>
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