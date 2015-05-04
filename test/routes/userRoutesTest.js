// test helper clears out the database as well as setting up 
// the ENV and globally requiring assert
require('../testHelper');

var User = App.model('user'),
    supertest = require('supertest');

describe(__filename, function() {
    var Test; // used to pass data that may be needed down through describes
    
    // clear out the Test object before each test
    beforeEach(function() {
        Test = {};    
    });
    
    // test user creation when a user exists in the db already
    describe('Having a user in the database', function() {
        beforeEach(function(done) {
            Test.userData = {
                email: 'at@at.com',
                password: 'pass'
            };    
            
            Test.user = new User({
                email: Test.userData.email,
                passwordHash: Test.userData.password
            });
            Test.user.save(function (err) {
                assert.ifError(err);
                done();
            });
        });
        
        // check that the sign_up route works correctly with a valid
        // new user
        it('should create a new user when passed valid data', function(done) {
            supertest(App.app)
                .post('/sign_up')
                .send({email: "big@at.com", password: 'test'})
                .expect(200)
                .end(function (err, res) {
                    if(err) {
                        console.log('error:', err);
                        console.log(res.body);
                        assert.ifError(err)
                    } else {
                        User.find({email: 'big@at.com'}, function (err, users) {
                            assert.ifError(err);
                            assert(users[0]);
                            assert.equal(users[0].email, 'big@at.com');
                            done();
                        })
                    }
                })
        });

        it('should produce an error and not make a new user with duplicate data', function(done) {
            supertest(App.app)
                .post('/sign_up')
                .send({email: Test.userData.email, password: 'test'})
                .expect(422)
                .end(function (err, res) {
                    if(err) {
                        console.log('error:', err);
                        console.log(res.body);
                        assert.ifError(err)
                    } else {
                        done();
                    }
                })
        });
    });
    
    it('should create the new users', function(done) {
        var req = {
            body: {
                email: 'test@example.com',
                password: 'override'
            }
        };
        
        // mock up the status and send that the userRoute uses
        // to test just the actions of the create function
        var res = {
            status: function(val) {
                this._status = val;
                return this;
            },
            send: function(val) {
                assert.equal(this._status, 200);
                assert.equal(val, 'Welcome to the game');
                
                User.count({}, function (err, count) {
                    assert.ifError(err);
                    assert.equal(1, count);
                    
                    User.find({}, function (err, records) {
                        assert.ifError(err);
                        assert.equal(records[0].email, 'test@example.com');
                        done();
                    });
                });
            }
        };
        var userRoutes = App.route('userRoutes');
        
        userRoutes.create(req, res);
    });
});