var index = require('./index.js');


var post = require('./post.js');
module.exports = function(app) {
	app.get('*', index);

	app.get('/:id', post);
    app.post('/:id', post);
}