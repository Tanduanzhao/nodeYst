var express = require('express');
var request = require('superagent');
module.exports = function(req, res, next) {
    request('http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf').end(function(err,ress){
        console.log(err,ress.text);
        res.send('sd');
    });
}