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