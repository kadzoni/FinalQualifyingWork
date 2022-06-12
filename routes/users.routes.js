const express = require('express'),
  router = express.Router(),
  UserController = require('../controllers/users.controller'),
  cookie_parser = require('cookie-parser')
 
router.use(cookie_parser('1234'))
router.use(async (req, res, next) => {
  let data = req.body

  if (data) {
    req.users = data
    next()
  } else
    return res
      .status(500)
      .send({ message: 'Error while getting users' })
})

router
  .route('/')
  .post(UserController.createUser)
  .get(UserController.signOut)
module.exports = router