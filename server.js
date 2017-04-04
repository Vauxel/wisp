// Load dependencies
var express = require("express");
var nunjucks = require("nunjucks");

var app = express();

console.log("Starting Wisp...");

// Load JSON config
var config = require("./config/app.json");

// Set Express variables
app.set("port", config.port);
app.set("x-powered-by", config.poweredby_header);
app.set("case sensitive routing", config.sensitiverouting);
app.use(express.static(config.staticfolder));

// Configure Nunjucks templating engine
var nunjucks_env = nunjucks.configure(config.viewsfolder, {
	express: app,
	autoescape: config.templating.autoescape,
	watch: config.templating.autoreload
});

// Load controllers
require("./controllers/home.js").route(app);
require("./controllers/error.js").route(app); // Load this last

// Startup server
server = app.listen(app.get("port"), function () {
	console.log("Wisp server listening on port " + server.address().port);
});