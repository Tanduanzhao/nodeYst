/*
    个人中心模块
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
import FooterBar from './footerBar';
import {Link} from 'react-router';
import {loadUserInfo} from './function/ajax';
class Center extends Component{
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
        console.log(this.props.userInfo.vipEndDate,'vip');
        console.log(this.props.userInfo.vip,'vip');
        return(
            <div className="scroll-content has-footer center">
                <div className="list">
                    <div className="item item-avatar bg_center">
                        <img style={{top:"30px", left:"35px"}} src={this.props.userInfo.imgUrl} width="80"/>
                        <h2>{this.props.userInfo.userName}</h2>
                        <p>
                            {
                                //this.props.userInfo.isVip != '0' ? <img className="vipLogo" src="/images/vipLogo.png" alt=""/>:<img className="vipLogo" src="/images/mass.png" alt=""/>
                                (()=>{
                                    switch(this.props.userInfo.isVip){
                                        case '0': return <img className="vipLogo" src="/images/mass.png" alt=""/>;
                                        case '1':return <img className="vipLogo" src="/images/vipLogo.png" alt=""/>;
                                        case '2':return <img className="vipLogo" src="/images/superVipLogo.png" alt=""/>;
                                        default : return <img className="vipLogo" src="/images/mass.png" alt=""/>;
                                    }
                                })()
                            }
                            {
                                this.props.userInfo.isVip != '0'
                                 ? <span className="time">到期时间:{this.props.userInfo.vipEndDate}</span>
                                :null
                            }
                        </p>
                    </div>
                </div>
                <div className="list center-viwe">
                    <Link to="pay/vip" className="item item-icon-left">
                        <img src="/images/open_icon.jpg" alt=""/>
                        开通会员
                    </Link>
                    <Link to="purchase" className="item item-icon-left">
                        <img src="/images/purchase_icon.jpg" alt=""/>
                        已购报告
                    </Link>
                    <Link to="subscribePage" className="item item-icon-left">
                        <img src="/images/subscribePage.jpg" alt=""/>
                        已订专栏
                    </Link>
                    <Link to="collect" className="item item-icon-left">
                        <img src="/images/collect.jpg" alt=""/>
                        我的收藏
                    </Link>
                    <Link to="center/contribute" className="item item-icon-left">
                        <img src="/images/contribute_icon.jpg" alt=""/>
                        我要投稿
                    </Link>
                    <Link to="center/feedback" className="item item-icon-left">
                        <img src="/images/idea_icon.jpg" alt=""/>
                        意见反馈
                    </Link>
                    <Link to="center/user" className="item item-icon-left">
                        <img src="/images/user.jpg" alt=""/>
                        关于我们
                    </Link>
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