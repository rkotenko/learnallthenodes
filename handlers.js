module.exports.home = function(req,res) {
    res.setHeader("Content-Type", 'text/html');
    res.send("<html><head><title>NodeSlash</title></head>" +
    "<body><h1>Web's Premiere Browser Game</h1>" +
    '<form action="/login" method="POST"> ' +
    '<label for="username">Username:</label>' +
    '<input name="username" type="text">' +
    '<input type="submit" value="Start!">' +
    "<p><img src='/images/sword_and_shield.png'></p>");
};

module.exports.adventuresIndex = function(req,res) {
    res.setHeader("Content-Type", 'text/html');
    res.send("<html><head><title>Adventures - NodeSlash</title></head>" +
    "<body><h1>Are ye bravez," + req.session.username + "?</h1>" +
    "<form action='adventures' method='POST'>" +
    "<button type='submit'>Yes I am bravez</button></form></body></html>");
};

module.exports.createAdventure = function(req,res) {
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

module.exports.updateAdventure = function(req,res) {
    res.setHeader("Content-Type", 'text/html');
    res.send("<html><head><title>Adventures - NodeSlash</title></head>" +
    "<body><h1>It's a secret to everybody.</h1></body></html>");
}

module.exports.showLoot = function(req,res) {
    var id = req.params.id;

    res.setHeader("Content-Type", 'text/html');
    res.send("<html><head><title>Adventures - NodeSlash</title></head><body><h1>Ogre-slaying knife</h1><p>It has +9 against ogres. It was id #" + id + "</p></body></html>");
}

module.exports.login = function(req, res) {
    if(req.body.username) {
        req.session.username = req.body.username;
        res.redirect('/adventures');
    } else {
        res.redirect('/');
    }
};

module.exports.readFromDB = function readFromDB(req, res, next) {
    next(new Error('no db here!'));
};