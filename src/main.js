module.exports.route = function(app) {
	app.get('/', function(req, res) {
		res.render('index.html');
	});
};