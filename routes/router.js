var index = require('./index.js');
var post = require('./post.js');
var getToken = require('./getToken');
module.exports = function(app) {
	app.get('/', index);
    app.get('/favicon.ico', function(req,res){
        res.end('');
    });
    app.get('/rise/*',index);
    app.get('/optional',index);
    app.get('/produce',index);
    app.get('/produce/*',index);
	app.get('/center', index);
    app.get('/datas', index);
    app.get('/datas/*', index);
    app.get('/center/*',index);
    
    app.post('/getToken',getToken);
}