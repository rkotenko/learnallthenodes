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
    model: function(path) {
        return this.require('app/models/' + path);
    },
    route: function(path) {
        return this.require("app/routes/" + path);
    },
    util: function(path) {
        return this.require('app/utils/' + path);
    }
};

// View template setup
App.app.set('views', App.appPath('app/views'));
App.app.set('view engine', 'jade');

// pretty nicely formats for view in browser
App.app.locals.pretty = env === 'development';
App.app.locals({bossify: App.util('bossify')});

var lessMiddleware = require('less-middleware'),
    lessMiddlewareOptions = {
        dest: App.appPath('public'),
        debug: App.env === 'development', // debug in dev
        force: App.env === 'development', // in dev, force a recompile
        once: App.env !== 'development', // not in dev, only recompile once for each server restart 
        relativeUrls: true,
        preprocess: {
            path: function(pathname, req) {
                return pathname.replace('/stylesheets', ''); // strip out any stylesheet directory passed with a css call
            }
        }
    },
    lessParserOptions = {
        dumpLineNumbers: 'mediaquery'
    },
    lessCompilerOptions = {
        compress: App.env !== 'development'
    };

App.app.use(lessMiddleware(
    App.appPath('app/stylesheets'),
    lessMiddlewareOptions,
    lessParserOptions,
    lessCompilerOptions
));

console.log(lessMiddlewareOptions);

// Middleware
App.app.use(express.bodyParser());
App.app.use(express.methodOverride());
App.app.use(express.cookieParser());
App.app.use(express.cookieSession({secret: 'not one', key: 'session'}));
App.app.use(express.static(App.appPath('public')));
App.app.use(App.app.router);

App.require("config/routes.js")(App.app);

// load the database connection
App.require('config/database')(process.env.DATABASE_URL || 'mongodb://localhost/nodeslash_' + App.env); 
