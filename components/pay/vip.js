import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import FooterBar from '../common/footerBar';
import {Link} from 'react-router';
import {loadWx,requestUnifiedorderPayService} from '../function/ajax';
import {onBridgeReady} from '../function/common';

class Vip extends Component{
    constructor(props){
        super(props);
    }

    //退出会员页面
    _pushHandle(){
        this.context.router.goBack();
    }

    //支付方法
    _sandboxPayService(id,self){
        if(!this.refs.checkbox.checked){
            alert("请同意服务协议")
            return false
        }
        requestUnifiedorderPayService({
            id:id,
            fun: loadWx({
                callBack:(res)=>{
                    if (res.datas) {
                        this.props.dispatch({
                            type: 'LOADUSERINFO',
                            datas: res.datas
                        });
                        setTimeout(()=>{this.context.router.push('/center')});
                    }
                }
            }),
            callBack:onBridgeReady})
}
    render(){
        return(
            <div className="root vip">
                <div className="scroll-content">
                    <div className="banner">
                        <img src="/images/vip_header.jpg"/>
                        <button className="close" onClick={this._pushHandle.bind(this)}></button>
                    </div>
                    <div className="level">
                        <h3>需开通会员后才能查看数据<br/>如已开通再次购买将叠加会员期限</h3>
                        <ul className="row">
                            <li className="col-80">
                                <ul className="row">
                                    <li className="col-20"><img src="/images/level.jpg" alt=""/></li>
                                    <li className="col-50"><span>1个月会员</span></li>
                                    <li className="col"><img className="level-price" src="/images/level_price.jpg" alt=""/></li>
                                </ul>
                            </li>
                            <li className="col-20"><button className="col"  onClick={this._sandboxPayService.bind(this,"pxFGiwzFAD8mjP9sPRv416VBs3Is")}>立即开通</button></li>
                        </ul>
                        <ul className="row">
                            <li className="col-80">
                                <ul className="row">
                                    <li className="col-20"><img src="/images/level02.jpg" alt=""/></li>
                                    <li className="col-50"><span>3个月会员</span></li>
                                    <li className="col"><img className="level-price" src="/images/level_price02.jpg" alt=""/></li>
                                </ul>
                            </li>
                            <li className="col-20"><button className="col"  onClick={this._sandboxPayService.bind(this,"pxFGiw7CWclXnIvqF6JqlcguRc-8")}>立即开通</button></li>
                        </ul>
                        <ul className="row">
                            <li className="col-80">
                                <ul className="row">
                                    <li className="col-20"><img src="/images/level03.jpg" alt=""/></li>
                                    <li className="col-50"><span>12个月会员</span></li>
                                    <li className="col"><img className="level-price" src="/images/level_price03.jpg" alt=""/></li>
                                </ul>
                            </li>
                            <li className="col-20"><button className="col"  onClick={this._sandboxPayService.bind(this,"pxFGiwyfqw59qONiyD5Gq5Ro__2g")}>立即开通</button></li>
                        </ul>
                        <ul className="row">
                            <li className="col-80">
                                <ul className="row">
                                    <li className="col-20"><img src="/images/level04.jpg" alt=""/></li>
                                    <li className="col-50"><span>超级VIP会员 1年</span></li>
                                    <li className="col"><img className="level-price" src="/images/level_price04.jpg" alt=""/></li>
                                </ul>
                            </li>
                            <li className="col-20"><button className="col"  onClick={this._sandboxPayService.bind(this,"pxFGiw0W8xkgzT7NNtqB5wUoZfGQ")}>立即开通</button></li>
                        </ul>
                        <div className="protocol"><input ref="checkbox" type="checkbox" defaultChecked/>我已阅读并同意 <Link to="pay/vip/protocol">《药市通会员服务协议》 </Link></div>
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
