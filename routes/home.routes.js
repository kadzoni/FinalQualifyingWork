const express = require('express'),
  router = express.Router(),
  HomeController = require('../controllers/home.controller'),
  HomeService = require('../services/home.service')
  
  router
    .route('/')
    .get(HomeController.getMainPage)
  router
    .route('/chat/:roomName')
    .get(HomeController.getChatRoom)
    .post(HomeController.ioshechka)
  router
    .route('/docs')
    .get(HomeController.getDocsPage)
  module.exports = router