/**
 * Created by Administrator on 2017/1/13.
 */
var http = require('http');
var request = require('request');
var express = require('express');
module.exports = function(req, res, next) {
    console.log(req.body);
//    https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
    request('http://apis.map.qq.com/ws/place/v1/search?keyword=药店&boundary=nearby(39.908491,116.374328,1000)&key=3P3BZ-ZO333-QVE3J-YNVJ3-GZ4E6-XQFVR',function(error,result){
        console.log(result);
    })
    res.render('index', {
        name: 'cashely',
        uri: '',
        city: 'guan'
    });
}
