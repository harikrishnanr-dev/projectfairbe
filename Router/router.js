// import express 
const express = require('express');

// router library is inside express so import that
const router = new express.Router()
const userController = require ('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multer = require('../Middlewares/multerMiddleware');
const multerConfig = require('../Middlewares/multerMiddleware');
    
// different paths for resolving requests

router.post('/user/register',userController.register) 
router.post('/user/login',userController.login) 
// router.get('/user/getUserDetails',userController.getUserDetails) 
router.post('/project/addProject',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject) 

// Export Router 
module.exports=router