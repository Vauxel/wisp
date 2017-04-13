module.exports.init = function(app) {
	require("./main.js").route(app);
	require("./error.js").route(app);
};