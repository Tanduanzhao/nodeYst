import React,{Component} from 'react';
export default class Pdf extends Component{
    constructor(props){
        super(props);
        wx.ready(()=> {
             // 分享
                var info = {
                    title: this.props.params.title,
                    link: 'http://yst.immortalshealth.com',
                    imgUrl: 'http://yst.immortalshealth.com/pub/resources/sysres/logo.jpg',
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
    }
    componentDidMount(){
        console.dir(this.refs.frame);
    }
    componentWillUnmount(){
        wx.ready(()=> {
             // 分享
                var info = {
                    title: '药市通-首个医药行业报告超市',
                    link: 'http://yst.immortalshealth.com',
                    imgUrl: 'http://yst.immortalshealth.com/pub/resources/sysres/logo.jpg',
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
        this.url = `http://yst-test.immortalshealth.com/pdfjs-1.1.114-dist/web/viewer.html?file=http://yst.immortalshealth.com/modm/pub/getPubPdf?reportId%3D${this.props.params.id}`;
        return(
            <div className="root">
                <div style={{width:'100%',height:'100%',overflowScrolling:'touch',overFlow:'auto'}}>
                    <iframe ref='frame' style={{display:'block',overFlow:'auto'}} width="100%" height="100%" name="iFrame1" width="100%" scrolling="yes" src={this.url}></iframe>
                </div>
            </div>
        )
    }
}