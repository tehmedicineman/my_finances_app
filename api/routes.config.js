const router = require('express').Router();

router.use('/finances', require('./routes/finances'));
// router.use('/secure', require('./routes/secure'));

module.exports = router;