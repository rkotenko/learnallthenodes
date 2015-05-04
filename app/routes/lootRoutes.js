var ItemTemplate = App.model('ItemTemplate');

module.exports.index = function(req, res) {
    ItemTemplate.find({}, function(err, records) {
        if(err) return res.status(422).send('Problem loading the records', err.message);

        res.render('loot/index', {title: 'All the loot - Node Slash', loots: records});
    });
};

module.exports.show = function(req,res) {
    var id = req.params.id;
    ItemTemplate.findById(id, function (err, loot) {
        if(err)  return res.status(422).send('Problem loading the loot:', err.message);
        
        if(!loot) return res.status(404).send('Could not find the loot');

        res.render('loot/show', {loot: loot});
    });
    
}