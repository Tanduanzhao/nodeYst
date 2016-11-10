import React,{Component} from 'react';
import {loadReport,keepReport,cancelKeepReport} from './function/ajax';
import {WXKEY,HTTPURL} from './config';
import Loading from './loading';
import {OpenProductView} from './function/common';
import Popup from './popup';
export default class Pdf extends Component{
    constructor(props){
        super(props);
        console.log(this.props.params.id,"sss");
        wx.ready(()=> {
             // 分享
                var info = {
                    title: this.props.params.title,
                    link: HTTPURL+'/pdf/'+this.props.params.id+"?recommender="+name,
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
        this.state = {
            report:{
                content:null,
                title:null
            },
            isLoading:true,
            reportVersion:"total",
            showPopup:false,
            id:this.props.params.id,
            isKeep:false
        }
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
                    isKeep:res.datas.isKeep
                })
            }
        })
    }
    componentDidMount(){
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
    _openProductView(id,self){
    	OpenProductView(id,()=>{
    			this.setState({
    				showPopup:true
    			});
    		}
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
        this.context.router.push('/purchase');
    }
    keepReport(){
        console.log(this.props.params.id)
        if(this.state.isKeep != 1){
            keepReport({
                reportId:this.props.params.id,
                callBack:(res)=>{
                    if(res.state==1)
                        this.setState({
                            isKeep:1
                        })
                }
            })
        }else{
            console.log("ssss")
            cancelKeepReport({
                reportId:this.props.params.id,
                callBack:(res)=>{
                    if(res.state==1)
                        this.setState({
                            isKeep:0
                        })
                }
            })
        }
    }
    render(){
        console.log(this.state.isKeep,"ss");
        return(
            <div className="root">
                {
                    this.state.showPopup ? <Popup  {...this.props} popupCancel={this._popupCancel.bind(this)} popupSure={this._popupSure.bind(this)}/> : null
                }
                <div className="bar bar-positive bar-header">
                    <h4 className="title">
                        <button className="button title_button" onClick={this.keepReport.bind(this)}>
                            <i className={(this.state.isKeep != 1) ? "fa fa-star-o fa-2x": "fa fa-star fa-2x"}></i>
                        </button>
                        {this.props.params.title}</h4>
                </div>
                <div className="scroll-content has-header padding report-content" dangerouslySetInnerHTML={{__html:this.state.report.content}}>
                </div>
                {
                    this.state.reportVersion=="brief"
                        ?<div onClick={()=>this._openProductView(this.state.id)}className="bar bar-footer bar-assertive row purchase-report ">
                            <button className="button-clear col-50 purchase-price">¥{this.props.params.price}</button>
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