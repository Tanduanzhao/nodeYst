/*
    微信授权
*/
import {loadWx,loadJssdk,getUserAreaInfo} from './ajax';
import {url2obj} from './common';
var isLogin = false;
export const Token = function(fn){
    if(isLogin || url2obj().code){
        loadWx({
          code:url2obj().code,
          callBack:(res)=>{
              isLogin = true;
          }
        })
        //获取微信授权
        loadJssdk({
            uri:location.href,
            callBack:(res) => {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: 'wx5b09933bb205ed95', // 必填，公众号的唯一标识
                    timestamp: res.datas.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.datas.nonceStr, // 必填，生成签名的随机串
                    signature: res.datas.signature, // 必填，签名，见附录1
                    jsApiList: ['getLocation', 'onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function() {
                     wx.getLocation({
                        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                        success: function(res) {
                            //获取地理位置信息接口
                            getUserAreaInfo({
                                latitude:res.latitude,
                                longitude: res.longitude,
                                callBack:(res)=>{
                                    fn(res);
                                }
                            })
                        }
                     })
                });
            }
        })
    }else{
      location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5b09933bb205ed95&redirect_uri=http://yst-test.immortalshealth.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
    }
}