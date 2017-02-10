/*
    个人中心模块
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
import FooterBar from './common/footerBar';
import {Link} from 'react-router';
import {HTTPURL,WXKEY} from './config.js';
import {getSign,loadUserInfo,invitationCustomer,getInitWxUser} from './function/ajax';
class Center extends Component{
    constructor(props){
        super(props);
        this.state={
            showPopup:false,
            mobileNum:0,
            opacityNum:0
        }
    }
    counter(){
        this.setState({
            mobileNum:this.state.mobileNum+2,
            opacityNum:this.state.opacityNum+0.1
        });
    }
    //签到
    _signIn(){
        if(this.props.userInfo.isSign == 0){
            getSign({
                userId:this.props.userInfo.id,
                callBack:(res)=>{
                    this.props.dispatch({
                        type:'ISSIGN',
                        isSign:1,
                        score:this.props.userInfo.score+5
                    });
                    if(this.state.mobileNum<=20){
                        setTimeout(()=>{
                            console.log(this.state.mobileNum,"mobileNum")
                            this.counter()
                        },10);
                    } else if(this.state.mobileNum>20){
                        this.setState({
                            mobileNum:0,
                            opacityNum:0
                        });
                    }
                }
            })
        }
    }

    //邀请客户
    _invitation(){
        invitationCustomer({
            userId:this.props.userInfo.id,
            callBack:(res)=> {
                var info = {
                    title:"来自"+res.datas.managerId+"的服务邀请",
                    link: HTTPURL+"?managerId="+res.datas.managerId,
                    //link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+WXKEY+'&redirect_uri='+encodeURI(HTTPURL+'?recommender='+name+"&managerId="+res.datas.managerId)+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',
                    imgUrl: HTTPURL+'/pub/resources/sysres/logo.jpg',
                    desc: '小伙伴们我已加入药市通客户经理，期待为您服务。'
                };
                wx.ready(()=>{
                    wx.onMenuShareTimeline({
                        title: info.title, // 分享标题
                        link: info.link, // 分享链接
                        imgUrl: info.imgUrl, // 分享图标
                        success: function() {
//                                $.toast('分享成功！');
                        }
                    });
                    wx.onMenuShareAppMessage({
                        title: info.title,
                        desc: info.desc, // 分享描述
                        link: info.link, // 分享链接
                        imgUrl: info.imgUrl, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function() {
                            // 用户确认分享后执行的回调函数
//                                $.toast('分享成功！');
                        },
                        trigger:function(){
                            //alert('trigge');
                        }
                    });
                    wx.error(()=> {
                        //authWxcode(info);
                    });
                });
            }
        })
    }
    _showPopup(){
        this._togglePopup();
        this._invitation();
    }
    _togglePopup(){
        this.setState({
            showPopup:!this.state.showPopup
        })
    }
    // //渲染完成后调用
    componentDidMount(){
        getInitWxUser({
            callBack:(res)=>{
                this.props.dispatch({
                    type: 'LOADUSERINFO',
                    datas: res.datas
                });
            }
        });
        this._invitation()
    }

    componentWillUnmount(){
        var info = {
            title: '药市通-首个医药圈的信息分享平台',
            link: HTTPURL,
            imgUrl: HTTPURL+'/pub/resources/sysres/logo.jpg',
            desc: '提供历年中标数据、广东省入市价、政策准入、质量层次等数据查询 ，提供行业分析报告，共享分成。'
        };
        wx.ready(()=> {
            // 分享
            wx.onMenuShareTimeline({
                title: info.title, // 分享标题
                link: info.link, // 分享链接
                imgUrl: info.imgUrl, // 分享图标
                success: function() {
//                                $.toast('分享成功！');
                }
            });
            wx.onMenuShareAppMessage({
                title: info.title,
                link: info.link, // 分享链接
                imgUrl: info.imgUrl, // 分享图标
                desc: info.desc, // 分享描述
                success: function() {
                    // 用户确认分享后执行的回调函数
//                                $.toast('分享成功！');
                }
            });
        });
//        wx.error(()=> {
//            // 分享
//            wx.onMenuShareTimeline({
//                title: info.title, // 分享标题
//                link: info.link, // 分享链接
//                imgUrl: info.imgUrl, // 分享图标
//                success: function() {
////                                $.toast('分享成功！');
//                }
//            });
//            wx.onMenuShareAppMessage({
//                title: info.title,
//                link: info.link, // 分享链接
//                imgUrl: info.imgUrl, // 分享图标
//                desc: info.desc, // 分享描述
//                success: function() {
//                    // 用户确认分享后执行的回调函数
////                                $.toast('分享成功！');
//                }
//            });
//        });
    }

    render(){
        return(
            <div className="root">
                {
                    this.state.showPopup ?<Popup  {...this.props}  popupSure={this._togglePopup.bind(this)}/>:null
                }
                <div className="scroll-content has-footer center">
                    <div className="center-top">
                        <div className="center-top-user">
                            <div className="user">
                                <div  className="user-logo">
                                    <img className="user-img" src={this.props.userInfo.imgUrl} style={{boxShadow:'0 0 4px #fff'}}/>
                                    {
                                        (()=>{
                                            switch(this.props.userInfo.isVip){
                                                case '0': return <img className="vip-img" src="/images/mass.png" alt=""/>;
                                                case '1':return <img className="vip-img" src="/images/vipLogo.png" alt=""/>;
                                                case '2':return <img className="vip-img" src="/images/superVipLogo.png" alt=""/>;
                                                default : return <img className="vip-img" src="/images/mass.png" alt=""/>;
                                            }
                                        })()
                                    }
                                </div>
                                <div  className="user-text">
                                    {this.props.userInfo.userName} <br/>
                                    {
                                        this.props.userInfo.isVip != '0'
                                            ? <span className="time">到期时间:{this.props.userInfo.vipEndDate}</span>
                                            :null
                                    }
                                </div>
                            </div>
                            {
                                this.props.userInfo.isSign == 0
                                ?<div className="sign-in" onClick={this._signIn.bind(this)}>签到</div>
                                :<div className="sign-in sign-in-is" onClick={this._signIn.bind(this)}>已签到</div>
                            }
                        </div>
                        <div className="row center-top-module">
                            <div className="col">
                                <div className="module">
                                    <div style={{display: 'flex',alignItems: 'center',marginBottom:' 1px'}}>
                                        <img src="/images/icon_score.png" style={{width: '1.025rem',marginRight:'4px'}}  alt=""/>
                                        <span className="module-title">积分</span>
                                    </div>
                                    当前积分 {this.props.userInfo.score}
                                   </div>
                            </div>
                            <Link  to="pay/vip" className="col">
                                <div  className="module">
                                    <div style={{display: 'flex',alignItems: 'center',marginBottom:' 1px'}}>
                                        <img src="/images/icon_vip.png" style={{width: '1.025rem',marginRight:'4px'}}  alt=""/>
                                        <span className="module-title">开通会员</span>
                                    </div>
                                    会员数  {this.props.userInfo.datas.vipNumber}
                                </div>
                            </Link>
                            <div className="col">
                                <div  className="module">
                                    <div style={{display: 'flex',alignItems: 'center',marginBottom:' 1px'}}>
                                        <img src="/images/icon_community.png" style={{width: '1.025rem',marginRight:'4px'}}  alt=""/>
                                        <span className="module-title">社区</span>
                                    </div>
                                    {
                                    //    {this.props.userInfo.datas.communityTopic} 万话题 <br/>
                                    //{this.props.userInfo.datas.communityUser} 成员
                                    }
                                    暂未开通
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="list center-viwe">
                        {
                            (()=>{
                                if( this.props.userInfo.datas.isAccountManager == 1){
                                    if(this.props.userInfo.datas.isChecked ==1){
                                        return <div className="center-viwe-card">
                                                    <div className="item item-icon-left">
                                                        <img src="/images/icon_manager.jpg" alt=""/>
                                                        客户经理
                                                        <span className="item-note">ID:{this.props.userInfo.datas.accountManagerId}</span>
                                                    </div>
                                                    <div className="text-center">
                                                        <table className="table-border" width="100%">
                                                            <tbody>
                                                            <tr>
                                                                <td>  <a  href={`tel:${this.props.userInfo.datas.phone}`} style={{ display: 'block'}} > <i className="icon ion-ios-telephone"></i> 联系客户经理</a></td>
                                                                <td>  <Link to="center/managerList" style={{ display: 'block'}}><i className="icon ion-edit"></i> 更换客户经理</Link></td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <Link  to="center/clientList" className="item item-icon-left">
                                                        <img src="/images/icon_customer.jpg" alt=""/>
                                                        我的客户（{this.props.userInfo.datas.customerNum}）
                                                        <span className="item-note"> 等级{this.props.userInfo.datas.level}</span>
                                                    </Link>
                                                    <div className="item text-center become-manager" onClick={this._showPopup.bind(this)}>
                                                        <i className="icon ion-plus"></i>
                                                        邀请客户
                                                    </div>
                                                </div>
                                    }else{
                                        return <div className="center-viwe-card">
                                                    <Link to="center/managerList" className="item item-icon-left">
                                                        <img src="/images/icon_manager.jpg" alt=""/>
                                                        客户经理
                                                        <span className="item-note">未绑定</span>
                                                    </Link>
                                                    <Link  to="center/clientList"  className="item item-icon-left">
                                                        <img src="/images/icon_customer.jpg" alt=""/>
                                                        我的客户（{this.props.userInfo.datas.customerNum}）
                                                        <span className="item-note"> 等级{this.props.userInfo.datas.level}</span>
                                                    </Link>
                                                    <div className="item text-center become-manager" onClick={this._showPopup.bind(this)}>
                                                        <i className="icon ion-plus"></i>
                                                        邀请客户
                                                    </div>
                                                </div>
                                    }
                                }else{
                                    if(this.props.userInfo.datas.isChecked ==1){
                                        return <div className="center-viwe-card">
                                                    <div className="item item-icon-left">
                                                        <img src="/images/icon_manager.jpg" alt=""/>
                                                        客户经理
                                                        <span className="item-note">ID:{this.props.userInfo.datas.accountManagerId}</span>
                                                    </div>
                                                    <div className="text-center">
                                                        <table className="table-border" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td>  <a  href={`tel:${this.props.userInfo.datas.phone}`} style={{ display: 'block'}} > <i className="icon ion-ios-telephone"></i> 联系客户经理</a></td>
                                                                    <td>  <Link to="center/managerList" style={{ display: 'block'}}><i className="icon ion-edit"></i> 更换客户经理</Link></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <Link to="center/managerProtocol" className="item text-center become-manager">
                                                        <i className="icon ion-plus"></i>
                                                        我要当客户经理
                                                    </Link>
                                                </div>

                                    }else{
                                        return <div className="center-viwe-card">
                                                    <Link to="center/managerList" className="item item-icon-left">
                                                        <img src="/images/icon_manager.jpg" alt=""/>
                                                        客户经理
                                                        <span className="item-note">未绑定</span>
                                                    </Link>
                                                    <Link to="center/managerProtocol" className="item text-center become-manager">
                                                        <i className="icon ion-plus"></i>
                                                        我要当客户经理
                                                    </Link>
                                                </div>
                                    }
                                }
                            })()
                        }
                        {
                            (navigator.platform.toLowerCase() != ("iphone" || "ios" || 'ipad'))?null:(
                            <div className="center-viwe-card" >
                                <Link to="center/nearHospital/药店" className="item item-icon-left">
                                    <img src="/images/pharmacy_icon.jpg" alt=""/>
                                    附近药店
                                </Link>
                                <Link to="center/nearHospital/医院" className="item item-icon-left">
                                    <img src="/images/hospital_ico.jpg" alt=""/>
                                    附近医院
                                </Link>
                            </div>
                            )
                        }
                        <div className="center-viwe-card" >
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
                        </div>
                        <div className="center-viwe-card">
                            <a  href="tel:13711197603" className="item item-icon-left">
                                <img src="/images/waiter.jpg" alt=""/>
                                联系客服
                                <span className="item-note">
                                    13711197603<img src="/images/phone.jpg" alt=""/>
                                </span>
                            </a>
                            <a href="tel:18813635988" className="item item-icon-left">
                                <img src="/images/manager.jpg" alt=""/>
                                销售经理
                                 <span className="item-note">
                                    18813635988<img src="/images/phone.jpg" alt=""/>
                                </span>
                            </a>
                        </div>
                        <div className="center-viwe-card">
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
                </div>
                <FooterBar {...this.props}/>
            </div>
        )
    }
}
class Popup extends Component{
    render(){
        return(
            <div style={{width:'100%',height:'100%'}}>
                <div className="backdrop visible active"></div>
                <div className="popup-container popup-showing active">
                    <div className="popup popup-invitation">
                        <img  className="popup_invitation_close" src="/images/popup_invitation_close.png" onClick={this.props.popupSure} alt=""/>
                        <img  className="popup_invitation_bg" src="/images/popup_invitation_bg.png" alt=""/>
                        <div  className="popup-button-layer">
                            <span onClick={this.props.popupSure} className="popup-button">确定</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function select(state){
    return{
        stores:state.userInfo,
        userInfo:state.userInfo
    }
}
export default connect(select)(Center);