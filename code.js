require('./config/application')
var User = App.model('user')
var u = new User({email: 'useruser.com'})
u.save(function(err){console.log(err)})


