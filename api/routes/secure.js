const router = require('express').Router();
var passport = require('passport');
require('passport-http');

router.get('/',
	passport.authenticate('basic', {session: false }),
	function(request, response, next){
		response.send({
			derp: "is who i am"
		});
	}
);

module.exports = router;