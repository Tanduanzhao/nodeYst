import React,{Component} from 'react';
import $ from 'jquery';
import {loadReport,keepReport,cancelKeepReport} from './../function/ajax';
import {WXKEY,HTTPURL,httpAddress} from './../config';
import Loading from './../loading';
import {OpenProductView,onBridgeReady} from './../function/common';
import Popup from './../popup';
import GotTop from './../gotTop';
import CollectPrompt from './../collectPrompt';
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
        this._popupSure = this._popupSure.bind(this);
    }
    _loadData(){
        this.setState({
            isLoading:true
        });
        loadReport({
            id:this.props.params.id,
            callBack:(res)=>{
                this.setState({
                    report:res.datas,
                    isLoading:false,
                    reportVersion:res.datas.reportVersion,
                    isKeep:res.datas.isKeep,
                    buyReport:res.datas.buyReport
                })
                setTimeout(()=>{
                    console.log(this.state.report.title,"ddd")
                    wx.ready(()=> {
                        // 分享
                        var info = {
                            title: this.state.report.title,
                            link: HTTPURL+'/pdf/'+this.props.params.id+'/'+encodeURI(encodeURI(this.state.report.title))+'/'+ this.state.report.price+"?recommender="+name+"&reportId="+this.props.params.id,
                            imgUrl: HTTPURL+'/pub/resources/sysres/logo.jpg',
                            desc: '小伙伴们和我一起去逛逛医药圈的信息分享平台--药市通~'
                        };
                        wx.onMenuShareTimeline({
                            title: info.title, // 分享标题
                            link: info.link, // 分享链接
                            imgUrl: info.imgUrl, // 分享图标
                            success: function() {
//                      $.toast('分享成功！');
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
                });
            }
        })
    }
    componentDidMount(){
        this.ele = this.refs.content;
        this._loadData();
    }
    componentWillUnmount(){
        wx.ready(()=> {
             // 分享
                var info = {
                    title: '药市通-首个医药圈的信息分享平台',
                    link: HTTPURL,
                    imgUrl: HTTPURL+'/pub/resources/sysres/logo.jpg',
                    desc: '提供历年中标数据、广东省入市价、政策准入、质量层次等数据查询 ，提供行业分析报告，共享分成。'
                };
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
    }
    //_openProductView(id,self){
    //	OpenProductView(id,()=>{
    //			this.setState({
    //				showPopup:true
    //			});
    //		}
    //	)
    //}

    //支付
    _sandboxPayService(id,sele){
        $.ajax({
            type: "POST",
            url:httpAddress+"pay/requestUnifiedorderPayService",
            data:{
                productId:id
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
                                this._loadData();
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
    _popupCancel(){
        this.setState({
            showPopup:false
        })
    }
    _popupSure() {
        this.context.router.push('/purchase');
    }
    keepReport(){
        clearInterval(setTimeout);
        if(this.state.isKeep != 1){
            keepReport({
                reportId:this.props.params.id,
                callBack:(res)=>{
                    if(res.state==1)
                        this.setState({
                            isKeep:1,
                            showPrompt:1,
                            showPromptMes:"已收藏"
                        })
                  setTimeout(()=>{
                        this.setState({
                            showPrompt:0
                        })
                    },1000)
                }
            })
        }else{
            cancelKeepReport({
                reportId:this.props.params.id,
                callBack:(res)=>{
                    if(res.state==1)
                        this.setState({
                            isKeep:0,
                            showPrompt:1,
                            showPromptMes:"取消收藏"
                        })
                    setTimeout(()=>{
                        this.setState({
                            showPrompt:0
                        })
                    },1000)
                }
            })
        }
    }
    scrollTop(){
        this.ele.scrollTop=0
    }
    render(){
        console.log( this.context.router,"sssss");
        return(
            <div className="root">
                {
                    this.state.showPopup ? <Popup  {...this.props} popupCancel={this._popupCancel.bind(this)} popupSure={this._popupSure.bind(this)}/> : null
                }
                {
                    this.state.showPrompt ? <CollectPrompt {...this.props} showPromptMes={this.state.showPromptMes}/> : null
                }
                <GotTop {...this.props} scrollTop={this.scrollTop.bind(this)} keepReport={this.keepReport.bind(this)}   {...this.props}  isKeep={this.state.isKeep}/>
                <div className="bar bar-positive bar-header">
                    <h4 className="title">
                        {
                            //<button className="button title_button" onClick={this.keepReport.bind(this)} >
                            //    <i className={(this.state.isKeep != 1) ? "fa fa-star-o fa-2x": "fa fa-star fa-2x"}></i>
                            //</button>
                        }
                        分析报告
                    </h4>
                </div>
                <div  ref="content" className="scroll-content has-header report-content">
                    <div>
                        <div className="reportTitle">
                            {this.state.report.title}
                            <div className="columnTitle">
                                <span>{this.state.report.publishDate}</span>
                                {
                                    this.state.report.reportSource?   <span>  {this.state.report.reportSource}</span>
                                    :null
                                }
                                {
                                    this.state.report.reportAuthor?<span> 文/{this.state.report.reportAuthor}</span>:null
                                }
                            </div>
                        </div>
                        <div className="nestedHTML" dangerouslySetInnerHTML={{__html:this.state.report.content}}></div>
                        <div  className={this.state.reportVersion=="brief"?"qr-code qr-code-bottom":"qr-code"}>
                            <span  style={{fontSize:' 15px'}}>药市通</span> <br/>
                            <span>____________________________________________</span><br/>
                            <span style={{display:'inline-block',marginTop:'8px', marginBottom: '10px'}}>首个医药圈的信息分享平台</span>
                            <p><img src="/images/weixi.png" alt=""/></p>
                            （长按图片识别二维码）
                        </div>
                    </div>
                </div>
                {
                    this.state.buyReport=="0"&& this.state.reportVersion=="brief"
                        ?<div onClick={this._sandboxPayService.bind(this,this.props.params.id)} className="bar bar-footer bar-assertive row purchase-report ">
                            <button className="button-clear col-50 purchase-price">¥{this.state.report.price}</button>
                            <button className="button-clear col-50">报告购买</button>
                        </div>
                        :  null
                }
                {
                    this.state.isLoading ? <Loading /> : null
                }
            </div>
        )
    }
}
Pdf.contextTypes = {
    router:React.PropTypes.object.isRequired
}