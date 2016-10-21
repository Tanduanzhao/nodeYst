import React,{Component} from 'react';
import {loadReport} from './function/ajax';
import {WXKEY,HTTPURL} from './config';
export default class Pdf extends Component{
    constructor(props){
        super(props);
        wx.ready(()=> {
             // 分享
                var info = {
                    title: this.props.params.title,
                    link: HTTPURL,
                    imgUrl: HTTPURL+'/pub/resources/sysres/logo.jpg',
                    desc: '小伙伴们和我一起去逛逛医药圈的报告超市--药市通~'
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
            }
        }
    }
    _loadData(){
        loadReport({
            id:this.props.params.id,
            callBack:(res)=>{
                this.setState({
                    report:res.datas
                })
            }
        })
    }
    componentWillMount(){
        this._loadData();
    }
    componentWillUnmount(){
        wx.ready(()=> {
             // 分享
                var info = {
                    title: '药市通-首个医药行业报告超市',
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
    render(){
        this.url = `${HTTPURL}/pdfjs-1.1.114-dist/web/viewer.html?file=${HTTPURL}/modm/pub/getPubPdf?reportId%3D${this.props.params.id}`;
        return(
            <div className="root">
                <div className="bar bar-positive">{this.state.report.title}</div>
                <div className="scroll-content has-header padding report-content" dangerouslySetInnerHTML={{__html:this.state.report.content}}>
            
                </div>
            </div>
        )
    }
}