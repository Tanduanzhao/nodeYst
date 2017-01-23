import React,{Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import {loadReport,loadJssdk,keepReport,cancelKeepReport,requestUnifiedorderPayService,selectReportReplys,insertReplyReport,insertLikeReport} from './../function/ajax';
import {HTTPURL,WXKEY} from './../config';
import Loading from './../common/loading';
import {OpenProductView,onBridgeReady,authWxcode} from './../function/common';
import SideBar from './../common/sideBar';
import CollectPrompt from './../collectPrompt';
class Pdf extends Component{
    constructor(props){
        super(props);
        this.state = {
            report:{
                content:null,
                title:null
            },
            pageNo: 1,
            isLike: 0,
            likeNum: 0,
            isLoading:true,
            infinite: true,
            request:true,
            reportVersion:"total",
            id:this.props.params.id,
            isKeep:false,
            showPromptMes: false,
            sendMessage:false,
            buyReport:false
        }
        this._infiniteScroll = this._infiniteScroll.bind(this);
        this._loadData = this._loadData.bind(this);
    }
    //获取页面数据

    _loadData(){
        this.setState({
            request:false
        });
        selectReportReplys({
            reportId:this.props.params.id,
            pageNo:this.state.pageNo,
            callBack:(res)=>{
                if(res.state == 1){
                    this.props.dispatch({
                        type:'LOADPDFCONCATDATA',
                        message:res.datas
                    });
                    if(this.state.sendMessage){
                        this.props.dispatch({
                            type:'LOADPDFDATA',
                            message:res.datas
                        });
                        this.refs.reportTextarea.value = null
                    }
                    if(res.totalSize <= this.props.stores.data.length){
                        this.setState({
                            infinite:false
                        })
                    }else{
                        this.setState({
                            pageNo:this.state.pageNo+1
                        })
                    }
                    this.setState({
                        isLoading: false,
                        request:true,
                        sendMessage:false
                    });

                }else{
                    alert('网络故障');
                }
            }
        })
    }

    //componentDidUpdate(){
    //    let images = document.querySelectorAll('.nestedHTML img');
    //    if(images.length == 0){
    //        return false;
    //    }
    //
    //    //console.log();
    //    //$(".nestedHTML a").lightbox();
    //    $('.nestedHTML img').each((index,ele)=>{
    //        $(ele).replaceWith('<a href="'+ele.src+'" data-lightbox="image-1">'+ele.outerHTML+'</a>');
    //    })
    //
    //    //console.log(document.querySelectorAll('.nestedHTML img'),'i mages');
    //}

    //支付
    _sandboxPayService(id,self){
        requestUnifiedorderPayService({id:id,fun:()=>{this._loadData()},callBack:onBridgeReady})
    }

    //收藏
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

    //返回顶部
    scrollTop(){
        this.ele.scrollTop=0
    }

    //点赞
    likeArticle() {
        if (this.state.isLike != 1) {
            insertLikeReport({
                reportId: this.props.params.id,
                callBack: (res)=> {
                    if (res.state == 1)
                        this.setState({
                            isLike: 1,
                            likeNum: this.state.likeNum + 1
                        })
                }
            })
        }
    }
    //滚动加载
    _infiniteScroll() {
        //全部高度-滚动高度 == 屏幕高度-顶部偏移
        if (this.ele.firstChild.clientHeight - this.ele.scrollTop <= document.body.clientHeight - this.ele.offsetTop && this.state.infinite && this.state.request) {
            this._loadData();
        }
    }

    //发布留言
    _sendMessage() {
        if (this.refs.reportTextarea.value == "") {
            return false
        }
        insertReplyReport({
            reportId: this.props.params.id,
            replyContent: this.refs.reportTextarea.value,
            callBack: (res)=> {
                this.setState({
                    pageNo: 1,
                    sendMessage:true,
                    infinite: true
                });
                setTimeout(()=> {
                    this._loadData();
                });
            }
        });
    }

    componentDidMount(){
        //this.html=document.getElementsByTagName('html')[0]
        //this.head= this.html.getElementsByTagName('head')[0]
        //this.head.getElementsByTagName('meta')[0].setAttribute('content', 'width=device-width,initial-scale=1, user-scalable=yes, minimal-ui');
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll', this._infiniteScroll);
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
                    isLike: res.datas.isLike,
                    likeNum: res.datas.likeNum,
                    buyReport:res.datas.buyReport
                });
                //let URL = HTTPURL+'/pay/pdf/'+this.props.params.id+"?recommender="+name+"&reportId="+this.props.params.id;
                let URL = HTTPURL+'/pay/pdf/'+this.props.params.id+"?recommender="+name;
                var info = {
                    title:res.datas.title,
                    link: URL,
                    //link:'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+WXKEY+'&redirect_uri='+encodeURIComponent(URL)+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',
                    imgUrl: HTTPURL+'/pub/resources/sysres/logo.jpg',
                    desc: '小伙伴们和我一起去逛逛医药圈的信息分享平台--药市通~'
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
        });

        this._loadData();
    }

    componentWillUnmount(){
        //this.head.getElementsByTagName('meta')[0].setAttribute('content', 'width='+window.screen.width+',initial-scale=1,minimum-scale=1, maximum-scale=1,user-scalable=no');
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
        wx.error(()=> {
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
        this.props.dispatch({
            type: 'RESETSPDF'
        });
    }

    render(){
        return(
            <div className="root">
                {
                    this.state.showPrompt ? <CollectPrompt {...this.props} showPromptMes={this.state.showPromptMes}/> : null
                }
                <SideBar {...this.props} scrollTop={this.scrollTop.bind(this)} keepReport={this.keepReport.bind(this)}   {...this.props}  isKeep={this.state.isKeep}/>
                <div className="bar bar-positive bar-header">
                    <h4 className="title">
                        分析报告
                    </h4>
                </div>
                <div  ref="content" className="scroll-content has-header report-content">
                    <div className="list">
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
                        <div  className={this.state.reportVersion=="brief"?"foot qr-code-bottom":"foot "}>
                            <div className="qr-code">
                                <span  style={{fontSize:' 15px'}}>药市通</span> <br/>
                                <span>____________________________________________</span><br/>
                                <span style={{display:'inline-block',marginTop:'8px', marginBottom: '10px'}}>首个医药圈的信息分享平台</span>
                                <p><img src="/images/weixi.png" alt=""/></p>
                                （长按图片识别二维码）
                            </div>
                            <div className="product-details-collect">
                                <i className="fa fa-eye"></i>{this.state.report.readNum}人查看
                                <i onClick={this.likeArticle.bind(this)}
                                   className={(this.state.isLike != 1) ? "fa fa-thumbs-o-up thumbs-up": "fa fa-thumbs-up thumbs-up-color thumbs-up"}></i><span
                                onClick={this.likeArticle.bind(this)}>{this.state.likeNum}人点赞</span>
                            </div>
                            <div className="item list-title">
                                <h3><i className="comment_icon"></i> 我要留言</h3>
                            </div>
                            <div className="comments">
                                <textarea name="" id="" cols="30" rows="10" ref="reportTextarea"
                                          placeholder="说点什么吧......"></textarea>
                                <button onClick={this._sendMessage.bind(this)}>提交</button>
                            </div>
                            <div className="item list-title ">
                                <h3><i></i> 用户留言</h3>
                            </div>
                            <ul className="list new_report">
                                {
                                    this.props.stores.data.map((ele)=> {
                                        return (ele.isReplay == 1)
                                            ? <List key={Math.random()} {...this.props} feedContent={ele.feedContent}/>
                                            : (<List key={Math.random()}  {...this.props} feedContent={ele.feedContent} dataSources={ele}/>)
                                    })
                                }
                            </ul>
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

class List extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="item item-row">
                <div className="item-left" style={{height: '2rem',width:'2rem'}}>
                    <img src={this.props.dataSources.userHeadImageUrl} alt=""/>
                </div>
                <div className="item-right">
                    <h3 className="item-nowrap title">
                        { decodeURI(decodeURI(this.props.dataSources.userAlias))}
                    </h3>
                    <div className="article" style={{fontSize:".6rem"}}>
                        {this.props.dataSources.replyContent}
                    </div>
                    <div className="introduce"> {this.props.dataSources.replyDate}</div>
                </div>
            </li>
        )
    }
}

Pdf.contextTypes = {
    router:React.PropTypes.object.isRequired
}
function select(state) {
    return {
        stores: state.pdf
    }
}

export default connect(select)(Pdf);