const express = require('express');
const Router = express.Router();
const userController = require('../controller/userController')
// Router.get('/user', userController)
Router.post('/user', userController.signUp)
Router.get('/user', userController.signIn)


module.exports = {
    userRoute: Router
};
