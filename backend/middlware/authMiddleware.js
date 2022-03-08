const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../mongoDB/dbModels/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token

  //Authorization object in HTTP header exists, When JWT is sent through authorization header the string starts with 'Bearer'
  //Authorization: Bearer <token>
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try { 
      //Get the token from authorization header, get an with .split array: ['Bearer', <token>]
      token = req.headers.authorization.split(' ')[1]

      //Verify token (decode)
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

      //Get user document -password from mongoDB by decoding the json web token payload: _id
      //Can access req.user in any protected route w/ middleware
      req.user = await User.findById(decodedToken._id).select('-password')

      //Call next middleware
      next()
    } catch (error) {
      console.error(error)
      //Unauthorized
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if(!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = {protect}