module.exports.index = function(req,res) {
    res.setHeader("Content-Type", 'text/html');
    res.send("<html><head><title>Adventures - NodeSlash</title></head>" +
    "<body><h1>Are ye bravez," + req.session.username + "?</h1>" +
    "<form action='adventures' method='POST'>" +
    "<button type='submit'>Yes I am bravez</button></form></body></html>");
};

module.exports.create = function(req,res) {
    res.setHeader("Content-Type", 'text/html');
    res.send("<html><head><title>Adventures - NodeSlash</title></head>" +
    "<body><h1>Thou hast bravez.</h1>" +
    "<form action='adventures/42' method='POST'>" +
    "<input type='hidden' name='_method' value='put'>" +
    "<button type='submit'>Cheat!</button></form>" +
    "<form action='adventures' method='POST'>" +
    "<button type='submit'>Again!</button></form>" +
    "<p>You have found some <a href='/loot/1'>loot.</a></p></body></html>");
};

module.exports.update = function(req,res) {
    res.setHeader("Content-Type", 'text/html');
    res.send("<html><head><title>Adventures - NodeSlash</title></head>" +
    "<body><h1>It's a secret to everybody.</h1></body></html>");
}