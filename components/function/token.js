/*
    微信授权
*/
import {connect} from 'react-redux';
import {url2obj,authWxcode} from './common';
import {WXKEY,HTTPURL} from '../config';
var isLogin = false;
export const Token = function(fn,store){
    if(store.getState().userInfo.isLogin ||url2obj().code){
        // 分享
        var info = {
            title: '药市通-首个医药圈的信息分享平台',
            link: HTTPURL+"?recommender="+name,
            imgUrl: HTTPURL+'/pub/resources/sysres/logo.jpg',
            desc: ' 提供历年中标数据、广东省入市价、政策准入、质量层次等数据查询 ，提供行业分析报告，共享分成。'
        };
        authWxcode(location.href,info);
    }else{
        var _recommender = url2obj().recommender;
        var reportId = url2obj().id;
        var managerId = url2obj().managerId;
        var URL;
        if(_recommender == undefined && (managerId == undefined)){
            _recommender = "";
            URL=HTTPURL;
        }else{
            if(_recommender != undefined){
                //URL=HTTPURL+location.pathname;
                URL=HTTPURL+location.pathname+'?recommender='+_recommender
            }else{
                URL=HTTPURL+location.pathname;
                if(sessionStorage.getItem("reportId")){
                    sessionStorage.setItem("recommender", _recommender);
                    sessionStorage.setItem("reportId", url2obj().reportId);
                }
                if(managerId != undefined ){
                    URL=HTTPURL+location.pathname+'?managerId='+managerId;
                }
            }
        }
        location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+WXKEY+'&redirect_uri='+URL+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
        return;
    }
}
