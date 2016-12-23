var index = require('./index.js');
var post = require('./post.js');
var getToken = require('./getToken');
var pdf = require('./pdf');
module.exports = function(app) {
	app.get('/', index);
    app.get('/favicon.ico', function(req,res){
        res.end('');
    });
    app.get('/rise/*',index);
    app.get('/optional',index);
    app.get('/report',index);
    app.get('/report/*',index);
	app.get('/center', index);
    app.get('/datas', index);
    app.get('/datas/*', index);
    app.get('/center/*',index);
    app.get('/home/',index);
    app.get('/pay/vip',index);
    app.get('/pay/vip/*',index);
    app.get('/pdf/*',index);
    app.get('/pdf',index);
    app.get('/pdf',pdf);
    app.get('/market',index);
    app.get('/market/*',index);
    app.get('/pay/pdf',index);
    app.get('/pay/pdfs',index);
    app.get('/pay/pdf/*',index);
    app.get('/pay/pdfs/*',index);
    app.get('/purchase',index);
    app.get('/picture',index);
    app.get('/picture/*',index);
    app.get('/collect',index);
    app.get('/bidListall',index);
    app.get('/bidListall/*',index);
    app.get('/subscribePage',index);
    app.get('/subscribePage/*',index);
    app.get('/subscribePageAll',index);
    app.get('/subscribePageAll/*',index);
    app.get('/subscribeContent',index);
    app.get('/subscribeContent/*',index);
    app.post('/getToken',getToken);
}