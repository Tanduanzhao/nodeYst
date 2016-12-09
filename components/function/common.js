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
        }, function(res) {
            //alert(res.err_msg);
            //alert(res.err_msg == "get_brand_wcpay_request:ok");
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                //alert("111");
                cb();
                //WeixinJSBridge.call('closeWindow');
            } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
        });
    } catch (e) {
        alert(e);
    }
}