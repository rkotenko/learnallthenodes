var mongoose = require('mongoose');

var schema = mongoose.Schema({
    email: {type: String, unique: true}
});

var Model = mongoose.model('User', schema);

module.exports = Model;
