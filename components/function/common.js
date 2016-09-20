const encode = function(str) {
    return encodeURI(encodeURI(str));
}
const decode = function(str) {
    return decodeURI(decodeURI(str));
}

export const url2obj = function(s){
    var str = location.search.slice(1);
    str = str.split('&');
    var obj = {};
    str.forEach(function(ele) {
        var _index = ele.indexOf('=');
        obj[ele.slice(0, _index)] = decode(ele.slice(_index + 1));
    })
    return obj;
}