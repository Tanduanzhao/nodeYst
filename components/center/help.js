/*
    帮助中心
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
class Help extends Component{
    componentDidMount(){
    }
    render(){
        return(
            <div className="root">
                <HeaderBar {...this.props}/>
                <Main/>
            </div>
        )
    }
}

class HeaderBar extends Component{
    render(){
        return(
            <div className="bar bar-header bar-positive">
               <div className="title"> 操作手册</div>
            </div>
        )
    }
}
class Main extends Component{
    render(){
        return(
            <div className="scroll-content has-header padding bg-fff center-secondary">
                <p>
                    药市通现有【首页】、【报告】、【行情】、【数据】及【个人中心】五大功能模块，通过市场行情的引导，分析报告的多维度分析以及中标数据、广东省入市价，政策准入等数据库的查询，让我们一起轻松玩转产品信息。
                </p>
                <img src="/images/help01.jpg" alt=""/>
                <h3>
                    报告
                </h3>
                <p>
                    分析报告从多维度剖析医药市场，倾情打造医药圈的报告超市, 从【首页】常用栏目或【报告】进入查看，点击左上角筛选条件 <span className="icon_help"></span> 可按行业报告、品类报告、处方分析、政策分析等种类进行查询。欢迎行业内愿意分享的市场研究人员踊跃投稿，共享收益，点击【个人中心>我要投稿】可查看投稿指南。
                </p>
                <img src="/images/help02.jpg" alt=""/>
                <h3>行情</h3>
                <p>
                    【行情】从多个角度展现区域市场总体表现的全景，页面从上至下分为省份/地市及时间切换区域、中西药市场、ATC分类涨幅榜、概念市场涨幅榜、品种影响力排行榜五个部分，点击具体分类或【…】可查看更多分类或品种信息。
                </p>
                <img src="/images/help03.jpg" alt=""/>
                <h3>数据</h3>
                <p>
                    数据查询从【首页】的常用栏目或【数据】进入查看，点击左上角查询条件 <span  className="icon_help"></span>  可分类查询，点击数据查询页面右下角【…】可查看更多栏目。【数据】现有中标数据、广东省入市价、政策准入和产品数据四个部分，涵盖17个数据库，赶紧加入会员享受福利吧！
                </p>
                <img src="/images/help04.jpg" alt=""/>
                <img src="/images/help05.jpg" alt=""/>
                <p>
                    如有其它问题，请在微信公众号内进行留言，我们的客服会及时回复。
                </p>
            </div>
        )
    }
}
function select(state){
    return{

    }
}
export default connect(select)(Help);
