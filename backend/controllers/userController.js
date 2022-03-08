const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../mongoDB/dbModels/userModel.js')
const bcrypt = require('bcryptjs/dist/bcrypt')

//@desc Register user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req,res) => {
  const { name, email, password } = req.body

  //Validation of post data
  if(!name || !email || !password) {
    //Bad request, need all fields
    res.status(400)
    throw new Error('All fields are required')
  }

  //Check if user exists
  const userExists = await User.findOne({email})
  if(userExists) {
    //Bad request, user exists already
    res.status(400)
    throw new Error('User already exists')
  }

  //Generate salt, Hash password
  const salt = await bcryptjs.genSalt(10)
  const hashedPass = await bcryptjs.hash(password, salt)

  //Create user w/ hashed password
  const user = await User.create({
    name: name,
    email: email,
    password: hashedPass
  })

  if(user) {
    //Resource successfully created, response with user data and json web token
    res.status(201)
    res.json({
      //When a new document is created in mongoDB is is assined an _id
      _id: user._id,
      name: user.name,
      email: user.email,
      token: genJWT(user._id)
    })
  } else {
    //Bad request
    res.status(400)
    throw new Error('Invalid user data')
  }
})

//@desc Get user data
//@route GET /api/users
//@access Private
const getUser = asyncHandler(async (req,res) => {
  //Protected route, middleware to check json web token
  //req.user data created in authMiddleware.js, can be used only used in routes with authMiddlware.js

  //OK
  res.status(200)
  res.json(req.user)
})

//@desc Authenticate user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req,res) => {
  const { email, password } = req.body

  //Get user document based on email (unique)
  const user = await User.findOne({email})

  //Check user exists and password matches
  if(user && (await bcrypt.compare(password, user.password))) {
    res.json({
      //When a new document is created in mongoDB is is assined an _id
      _id: user._id,
      name: user.name,
      email: user.email,
      token: genJWT(user._id)
    })
  } else {
    //Bad request
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

//Generate JSON web token at login and register
  const genJWT = (_id) => {
    return jwt.sign(
      //Payload
      {_id},
      //Secret
      process.env.JWT_SECRET,
      //Expires
      {expiresIn: '10d'}
    )
  }

module.exports = {registerUser, getUser, loginUser}