const express = require('express'),
  router = express.Router(),
  HomeController = require('../controllers/home.controller'),
  HomeService = require('../services/home.service')

  router
    .route('/')
    .get(HomeController.getSingInPage)
  module.exports = router