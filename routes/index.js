const express = require('express'),
  router = express.Router(),
  usersRoutes = require('./users.routes'),
  homeRoutes = require('./home.routes'),
  singInRoutes = require('./sing-in.routes'),
  cookie_parser = require('cookie-parser')
 
router.use(cookie_parser('1234'))
router.use('/users', usersRoutes)
router.use('/', homeRoutes)
router.use('/home', homeRoutes)
router.use('/sign-in',singInRoutes)

module.exports = router