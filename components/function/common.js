import {loadJssdk} from './ajax';
import {WXKEY} from '../config';

export function encode(str) {
    return encodeURI(encodeURI(str));
}
export function decode(str) {
    return decodeURI(decodeURI(str));
}
//移除数组中的某个固定值
export function arrRMval(arr,val){
    for(let i=0;i<arr.length;i++){
        if(arr[i]==val){
            arr.splice(i,1);
        }
    }
    return arr;
}
//判断数组中是否存在某个值，如果不存在添加进数组，如果存在删除值
export function valINarr(arr,val){
    var narr = arr;
    if(narr.indexOf(val) == -1){
        narr.push(val);
    }else{
        narr = arrRMval(narr,val);
    }
    return narr;
}

export const url2obj = function(s){
    var str = location.search.slice(1);
    str = str.split('&');
    var obj = {};
    str.forEach(function(ele) {
        var _index = ele.indexOf('=');
        obj[ele.slice(0, _index)] = decode(ele.slice(_index + 1));
    });
    return obj;
}

export function OpenProductView(id,cb){
    if (typeof WeixinJSBridge == "undefined")   return false;
    var pid = id;
//        var pid = "pDF3iY_G88cM_d-wuImym3tkVfG5";//只需要传递
    WeixinJSBridge.invoke('openProductViewWithPid',{"pid":pid},(res)=>{
        // 返回res.err_msg,取值
        // open_product_view_with_id:ok 打开成功
        if(res.err_msg == "open_product_view:ok" || res.err_msg == "open_product_view_with_id:ok"){
             cb();
        }
    })
}

export function onBridgeReady(data,cb){
    var appId = data.appId;
    var timeStamp = data.timeStamp;
    var nonceStr = data.nonceStr;
    var signType = data.signType;
    var pg = data.pg;
    var paySign = data.paySign;
    try {
        WeixinJSBridge.invoke('getBrandWCPayRequest', {
            "appId" : appId,
            "timeStamp" : timeStamp,
            "nonceStr" : nonceStr,
            "package" : "prepay_id=" + pg,
            "signType" : signType,
            "paySign" : paySign
        }, (res) =>{
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                cb();
                //WeixinJSBridge.call('closeWindow');
            } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
        });
    } catch (e) {
        alert(e);
    }
}


//公共获取微信验证

export function authWxcode(infoo,callBack){
    callBack = callBack || function(){};
    let info=infoo;
    loadJssdk({
        uri: location.href,
        callBack: (res) => {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: WXKEY, // 必填，公众号的唯一标识
                timestamp: res.datas.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.datas.nonceStr, // 必填，生成签名的随机串
                signature: res.datas.signature, // 必填，签名，见附录1
                jsApiList: ['getLocation', 'onMenuShareTimeline', 'onMenuShareAppMessage','openLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
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
                callBack()
            });
            wx.error(()=> {
                authWxcode(info,callBack)
            });
        }
    });
}