const express = require('express'),
  router = express.Router(),
  HomeController = require('../controllers/home.controller'),
  HomeService = require('../services/home.service')
  
//   router.use(async (req, res, next) => {
//     let data = await UsersService.getUsers()
  
//     if (data) {
//       req.users = data
//       next()
//     } else
//       return res
//         .status(500)
//         .send({ message: 'Error while getting users' })
//   })

// app.get("/products/:productId", function (request, response) {
//   response.send("productId: " + request.params["productId"])
// });
  router
    .route('/')
    .get(HomeController.getMainPage)
  router
    .route('/chat/:roomName')
    .get(HomeController.getChatRoom)
  module.exports = router