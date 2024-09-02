const express = require('express');
const Router = express.Router();
const cryptoController  = require('../controller/cryptoController')
const {authenticateToken} = require('../middleware/authentication')
Router.get('/Exchanges',authenticateToken, cryptoController.exchangesHandler)
Router.get('/crypto',authenticateToken, cryptoController.cryptoCoinDataHandler)

module.exports = {cryptoRoute:Router};