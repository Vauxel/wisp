module.exports.route = function(app) {
	// 500 error catching
	app.get('/error', function(req, res, next) {
		var err = new Error("A test server error");
		err.status = 500;
		next(err);
	});

	// 404 error catching
	app.get('*', function(req, res, next) {
		var err = new Error("Page not found");
		err.status = 404;
		next(err);
	});

	// Basic error handling
	app.use(function(err, req, res, next) {
		if(err) {
			res.status(err.status);

			var error = {
				type: err.status,
				message: err.message
			};

			if(err.status === 500) {
				error.backtrace = err.stack;
			}

			res.send(error);
			return;
		}

		next();
	});
};