var index = require('./index.js');
var post = require('./post.js');
module.exports = function(app) {
	app.get('/', index);
    app.get('/favicon.ico', function(req,res){
        res.end('');
    });
	app.get('/center', index);
    app.get('/datas', index);
    app.get('/datas/*', index);
    app.get('/center/*',index);
    app.post('/:id', post);
}