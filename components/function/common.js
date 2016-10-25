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
    console.log(str)
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
        if (res.err_msg != "open_product_view_with_id:ok" && /android/.test(navigator.userAgent.toLowerCase())){
//                alert(2);
            WeixinJSBridge.invoke('openProductView',{
                "productInfo":"{\"product_id\":\""+pid+"\",\"product_type\":0}"
            },(res)=>{
                cb();
                this.setState({
                    showPopup:true
                });
            });
        }else if(res.err_msg == "open_product_view_with_id:ok" && /ios | ipad | mac/.test(navigator.userAgent.toLowerCase())){
            WeixinJSBridge.invoke('openProductView',{
                "productInfo":"{\"product_id\":\""+pid+"\",\"product_type\":0}"
            },(res)=>{
                cb();
                this.setState({
                    showPopup:true
                });
            });
        }
    })
}