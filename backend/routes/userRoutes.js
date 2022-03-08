const express = require('express')
//Import express router
const router = express.Router()

//Import controllers module for users
const {registerUser, getUser, loginUser} = require("../controllers/userController.js")

//Import middleware for route protection (json web token authentication)
const {protect} = require('../middlware/authMiddleware.js')

//Routes
router.route('/')
  .post(registerUser)
  //Protected route
  .get(protect, getUser)
  

router.route('/login')
  .post(loginUser)


module.exports = router