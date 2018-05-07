var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

var User = require('./testing');


passport.use(new BasicStrategy(
	function(username, password, done){
		console.log('PASSSPOORRTTT');
		User.findOne({ username: 'derpy' }, function(err, user){
			console.log('hello',username, password);
			if(err) { return done(err); }

			if(!user) { return done(null, false); }

			if (!user.validPassword(password)) {return done(null, false); }

			return done(null, user);
		})
	}
))