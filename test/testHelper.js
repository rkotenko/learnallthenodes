process.env.NODE_ENV = 'test';
require('../config/application');

var async = require('async'),
    mongoose = require('mongoose');
    
global.assert = require('assert');

App.Test = {
    clearDb: function(done) {
        //corresponds to mongoose models and thus to mongo collections
        // that need to be cleared
        var models = [
            'User'
        ];

        async.each(models, 
            function(modelName, cb) {
                var model = mongoose.model(modelName);
            
                model.remove({}, cb);
            
            },
            function(err) {
                assert.ifError(err);
                done();
            });
    }
};

beforeEach(function(done) {
   App.Test.clearDb(done);
   //console.log('testHelper clearDB');
});