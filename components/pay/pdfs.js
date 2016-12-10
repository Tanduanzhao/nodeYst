import React,{Component} from 'react';
import $ from 'jquery';
import {loadReport,keepReport,cancelKeepReport} from '../function/ajax';
import {WXKEY,HTTPURL} from '../config';
import Loading from '../loading';
import {OpenProductView,onBridgeReady} from '../function/common';
import Popup from '../popup';
import GotTop from '../gotTop';
import CollectPrompt from '../collectPrompt';
export default class Pdf extends Component{
    constructor(props){
        super(props);
        this.state = {
            report:{
                content:null,
                title:null
            },
            isLoading:true,
            reportVersion:"total",
            showPopup:false,
            id:this.props.params.id,
            isKeep:false,
            showPromptMes:false,
            buyReport:false
        }
    }
    //支付
    _sandboxPayService(){
        $.ajax({
            type: "POST",
            url:"http://yst-test.immortalshealth.com/modm/pay/requestUnifiedorderPayService",
            data:{
                productId:'pxFGiwzFAD8mjP9sPRv416VBs3Is'
            },
            async: false,
            error: function(request) {
                status = 'error';
                message = '系统异常，请稍后重试！';
            },
            success: function(ret) {
                var state = ret.state;
                if(state == "1") {
                    try {
                        if (typeof WeixinJSBridge == "undefined") {
                            if (document.addEventListener) {
                                document.addEventListener('WeixinJSBridgeReady',
                                    onBridgeReady(), false);
                            } else if (document.attachEvent) {
                                document.attachEvent('WeixinJSBridgeReady',  onBridgeReady());
                                document.attachEvent('onWeixinJSBridgeReady',  onBridgeReady());
                            }
                        } else {
                            onBridgeReady(ret.data,()=>{
                                this.context.router.push('/center');
                            })
                        }
                    } catch (e) {
                        alert(e);
                    }
                    window.event.returnValue = false;
                    return false;
                }
            }
        });
    }
    render(){
        console.log(this.state.buyReport,"ss");
        return(
            <div onClick={()=>this._sandboxPayService(this.state.id)}className="bar bar-footer bar-assertive row purchase-report ">
                <button className="button-clear col-50 purchase-price">¥{this.props.params.price}</button>
                <button className="button-clear col-50">报告购买</button>
            </div>
        )
    }
}
Pdf.contextTypes = {
    router:React.PropTypes.object.isRequired
}