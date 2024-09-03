const express = require('express');
const Router = express.Router();
const cryptoController  = require('../controller/cryptoController')
const {authenticateToken} = require('../middleware/authentication')
Router.get('/Exchanges',authenticateToken, cryptoController.exchangesHandler)
Router.get('/crypto',authenticateToken, cryptoController.cryptoCoinDataHandler)
Router.get('/list',authenticateToken, cryptoController.cryptoListHandler)

module.exports = {cryptoRoute:Router};