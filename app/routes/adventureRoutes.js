module.exports.index = function(req,res) {
    res.render('adventures/index', 
    {
        user: req.session.username,
        title: 'Adventures - Nodeslash'
    });
};

module.exports.create = function(req,res) {
    res.render('adventures/create');
};

module.exports.update = function(req,res) {
    res.render('adventures/update');
}