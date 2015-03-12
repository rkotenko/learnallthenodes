var env = process.env.NODE_ENV || 'development',
    packageJson = require('../package.json'),
    path = require('path'),
    express = require('express');
    
console.log("Loading App " + env + " mode.");

global.App = {
    app: express(),
    port: process.env.PORT || 3000,
    version: packageJson.version,
    root: path.join(__dirname, '..'),
    appPath: function(path) {
        return this.root + '/' + path
    },
    require: function(path) {
        return require(this.appPath(path))
    },
    env: env,
    start: function() {
        if(!this.started) {
            this.started = true;
            this.app.listen(this.port);
            console.log("Running App Version " + App.version + ' on port ' + App.port);
        }
    },
    route: function(path) {
        return this.require("app/routes/" + path);
    }
};

// Middleware
App.app.use(express.bodyParser());
App.app.use(express.methodOverride());
App.app.use(express.cookieParser());
App.app.use(express.cookieSession({secret: 'not one', key: 'session'}));
App.app.use(express.static(App.appPath('public')));
App.app.use(App.app.router);

App.require("config/routes.js")(App.app);
