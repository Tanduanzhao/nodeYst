/*
    帮助中心
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
class Contribute extends Component{
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
               <div className="title"> 投稿指南</div>
            </div>
        )
    }
}
class Main extends Component{
    render(){
        return(
            <div className="scroll-content has-header padding bg-fff center-secondary">
                <p>
                    药市通，是首个医药圈的报告超市，为行业
                    内愿意分享、愿意表达的市场研究人员提供平台，
                    只要是原创的，您都可以踊跃投稿！ 一经审核通
                    过，您的报告收益将于每月15号汇入您的银行账
                    号~
                </p>
                <h3>
                    一、投稿方式
                </h3>
                <p>
                    分析报告采用电子邮件方式进行投递，投稿
                    邮箱：immo-yst@immortalshealth.com 。
                </p>
                <h3>二、稿件要求</h3>
                <p>
                    稿件内容应是与医药信息相关的行业分析、
                    品类分析、处方分析等报告，要求报告资料可靠、
                    逻辑清晰，报告数据请备注来源，稿件格式如下：
                </p>
                <img src="/images/contribute01.png" alt=""/>
                <h3>三、稿费结算</h3>
                <p>
                    1.	原创报告的稿酬标准为“药市通平台个人报
                    告收益*50%”。
                </p>
                <p>
                    2.	稿费采取月结制，每月1日统计个人报告收
                    益，每月15日前将以银行卡/支付宝/微信等
                    转账方式将稿费汇到您的账号，请务必在稿
                    件中留下您的联系方式。
                </p>
                <p>
                    3.	稿件采用后发现非个人原创，稿费不予支付。
                    如涉及到侵权，由此带来的法律纠纷及后果，
                    我司保留追究责任的权利。
                </p>
                <img  className="contribute-footer" src="/images/contribute02.jpg" alt=""/>
            </div>
        )
    }
}
function select(state){
    return{

    }
}
export default connect(select)(Contribute);
