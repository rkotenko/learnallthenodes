var express = require("express"), 
    app = express(), 
    port = process.env['PORT'] || 3000,
    handlers = require('./handlers'),
    middleware = require('./middleware'),
    routes = require('./routes.js');


middleware(app, express);
routes(app, handlers);

app.listen(port);

console.log('Server running at http://127.0.0.1:' + port + '/');
