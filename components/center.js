/*
    个人中心模块
*/
import React,{Component} from 'react';
import FooterBar from './footerBar';
import {Link} from 'react-router';
import {loadUserInfo} from './function/ajax';
export default class Center extends Component{
    render(){
        return(
            <div className="root">
                <Main {...this.props}/>
                <FooterBar {...this.props}/>
            </div>
        )
    }
}

class Main extends Component{
    render(){
        return(
            <div className="scroll-content">
                <div className="list">
                    <div className="item item-avatar">
                        <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1926125421,997183280&fm=116&gp=0.jpg" width="80"/>
                        <h2>Venkman</h2>
                        <p>cashely.shi <span className="tag bg-assertive">VIP1</span></p>
                    </div>
                </div>
                <div className="list padding-top">
                    <div className="item item-icon-left">
                        <i className="icon ion-ios-cloud-upload-outline"></i>
                        我要投稿
                    </div>
                    <div className="item item-icon-left">
                        <i className="icon ion-ios-cart-outline"></i>
                        已购报告
                    </div>
                    <Link to="center/feedback" className="item item-icon-left">
                        <i className="icon ion-ios-chatboxes-outline"></i>
                        意见反馈
                    </Link>
                    <div className="item item-icon-left">
                        <i className="icon ion-ios-help-outline"></i>
                        帮助中心
                    </div>
                </div>
            </div>
        )
    }
}