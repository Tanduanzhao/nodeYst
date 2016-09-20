var request = require('request');
var sha1 = require('sha1')
module.exports = function(req,ress){
    console.log(req.query);
    // noncestr
     var createNonceStr = function() {
         
          return Math.random().toString(36).substr(2, 15);
     };

      // timestamp
     var createTimeStamp = function () {
          return parseInt(new Date().getTime() / 1000) + '';
     };
    // 计算签名方法
    
     var calcSignature = function (ticket, noncestr, ts, url) {
         console.log(url);
          var str = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp='+ ts +'&url=' + url;
          shaObj = sha1(str);
          return shaObj;
     }
    
    var ss = {
        nonceStr:createNonceStr(),
        timeStamp:createTimeStamp()
    };
    request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx5b09933bb205ed95&secret=b6d280f1c43d6f6c1ab1e459be34f211',function(error,res,body){
//        body.access_token
        
        body = JSON.parse(body);
        ss.access_token = body.access_token;
        request('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+ss.access_token+'&type=jsapi',function(error,res,body){
            
            body = JSON.parse(body);
            console.log(body);
            ss.ticket = body.ticket;
            var signature = calcSignature(ss.ticket, ss.nonceStr, ss.timeStamp, req.query.url);
//            ress.send(signature);
            console.log(ss);
            ss.signature = signature;
            console.log(ss);
//            return ss;
            ress.send(ss);
        })
    });
    
}