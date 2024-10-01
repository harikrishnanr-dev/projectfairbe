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
router.post('/project/addProject',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject) 
router.get('/project/homeproject',projectController.getHomeProject) 
router.get('/project/allproject',jwtMiddleware,projectController.getAllProject) 
router.get('/project/userproject',jwtMiddleware,projectController.getUserProject) 
router.put('/project/editproject/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editUserProject) 

// Export Router 
module.exports=router