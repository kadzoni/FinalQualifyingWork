const express = require('express'),
  router = express.Router(),
  usersRoutes = require('./users.routes'),
  homeRoutes = require('./home.routes')
router.use('/users', usersRoutes)
router.use('/', homeRoutes)

module.exports = router