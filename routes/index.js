var http = require('http');
var express = require('express');
module.exports = function(req, res, next) {

	res.render('index', {
		name: 'cashely',
		uri: '',
		city: 'guan'
	});
}