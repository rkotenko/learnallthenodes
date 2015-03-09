// MiddleWarez
function stoopidLogger(options) {
    return function stoopidLoggerInner(req, res, next) {
        console.log('called at: ', req.path);
        next();
    }
}

function notFound (req, res) {
    console.log('not found?');
    res.setHeader("Content-Type", "text/html");
    res.send(404, "NO PAGE!");
}

function catchErrors(err, req, res, next) {
    console.log('Error!');
    next(err);
}

function showErrorPage(err, req, res, next) {
    res.setHeader("Content-Type", "text/html");
    res.send(500, "error yo!");
}

module.exports = function(app, express) {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.cookieSession({secret: 'not one', key: 'session'}));
    app.use('/', stoopidLogger());
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
    app.use(notFound);  // no routes so not found
    app.use(catchErrors);
    app.use(showErrorPage);    
}
