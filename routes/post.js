module.exports = function(req, res, next) {
	var data = {
		name: 'cashely',
		age: '27'
	}
    console.log(req);
    res.end()
}