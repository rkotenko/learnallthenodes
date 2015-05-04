var User = App.model('user');

module.exports.new = function(req, res) {
    res.render('users/new');
};

module.exports.create = function(req, res) {
    var u = new User({email: req.body.email, passwordHash: req.body.password});

    u.save(function(err) {
        if(err) {
            res.status(422).send('Problem: ' + err.message);
        } else {
            res.status(200).send('Welcome to the game');
        }
    });
};