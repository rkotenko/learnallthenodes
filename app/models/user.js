var mongoose = require('mongoose'),
    validate = require('mongoose-validate'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,  // using small work factor for speed since this is not a real app
    REQUIRED_PASSWORD_LENGTH = 4;
    
function validateStringLength(value) {
    return value && value.length >= REQUIRED_PASSWORD_LENGTH;
}

var schema = mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        unique: true,
        validate: [validate.email, 'email was not valid']
    },
    passwordHash: {
        type: String,
        required: true,
        validate: [validateStringLength, 'password must be at least ' + REQUIRED_PASSWORD_LENGTH + ' characters']
    }    
});

schema.pre('save', function(next) {
    var self = this;
    
    if(!self.isModified('passwordHash')) return next();

    bcrypt.hash(self.passwordHash, SALT_WORK_FACTOR, function (err, hash) {
        if(err) return next(err);
        
        self.passwordHash = hash;
        next();
    });    
});

schema.statics.findByEmailAndPassword = function(email, ps, cb) {
    this.findOne({email: email}, function (err, user) {
        if(err) return cb(err);
        if(!user) return cb();
        
        bcrypt.compare(ps, user.passwordHash, function (err, res) {
            return cb(err, res ? user : null);
        })
    });        
};

schema.set('autoIndex', App.env != 'production');

var Model = mongoose.model('User', schema);

module.exports = Model;
