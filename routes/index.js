var http = require('http');
var request = require('request');
var express = require('express');
module.exports = function(req, res, next) {
//    https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
	res.render('index', {
		name: 'cashely',
		uri: '',
		city: 'guan'
	});
}