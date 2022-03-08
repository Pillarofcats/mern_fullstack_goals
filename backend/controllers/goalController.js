//Import of async middleware to tranfer errors to express error handler
const asyncHandler = require('express-async-handler')

//Import mongoDB model (schema)
const goalModel = require('../mongoDB/dbModels/goalModel.js')

//http: post
//route: /api/goals
//access: private
const createGoal = asyncHandler(async (req, res) => {
  if(!req.body.text) {
    //Status 400 = Bad Request
    res.status(400)
    //Express error handling
    throw new Error('Please add a text field')
  }

  //req.user.id can only be accessed if the route is protected with json web token authMiddleware.js
  const goal = await goalModel.create({
    user: req.user._id,
    text: req.body.text
  })
  //Status 200 = OK
  res.status(200).json(goal)
})

//http: get
//route: /api/goals
//access: private
const getGoals = asyncHandler(async (req, res) => {
  //user key on goalModel to link goalModel and userModel
  //req.user.id can only be accessed if the route is protected with json web token authMiddleware.js
  //Get the goals that match the user: _id from json web token authentication (req.user = decoded json web token object)
  const goals = await goalModel.find({user: req.user._id})
  
  //Validate goals
  if(!goals) {
    //Status 400 = Bad Request
    res.status(400)
    throw new Error('Could not get goals')
  }
  //Status 200 = OK
  res.status(200).json(goals)
})

//http: put
//route: /api/goals/:id
//access: private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await goalModel.findById(req.params.id)

  //Validate goal
  if(!goal) {
    //Status 400 = Bad Request
    res.status(400)
    throw new Error('Goal not found, cannot update')
  }

  //User validation (res.user pulled from authMiddleware.js)
  if(!req.user) {
    //Unauthorized
    res.status(401)
    throw new Error('User not found')
  }

  //Validate goalModel user key matches userModel _id key with req.user _id key from authMiddleware.js
  //req.user._id is the decoded json webtoken payload to authenticate a user
  if(goal.user.toString() !== req.user._id.toString()) {
    //Unauthorized
    res.status(401)
    throw new Error('User not authorized')
  }

  //findByIdAndUpdate(endpoint:id, put:data sent, add if doesn't exist)
  const updatedGoal = await goalModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
  //Status 200 = OK
  res.status(200).json(updatedGoal)
})

//http: delete
//route: /api/goals/:id
//access: private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await goalModel.findById(req.params.id)

  if(!goal) {
    //Status 400 = Bad Request
    res.status(400)
    throw new Error('Goal not found, cannot delete')
  }

  //User validation (res.user pulled from authMiddleware.js)
  if(!req.user) {
    //Unauthorized
    res.status(401)
    throw new Error('User not found')
  }

  //Validate goalModel user key matches userModel _id key with req.user _id key from authMiddleware.js
  //req.user._id is the decoded json webtoken payload to authenticate a user
  if(goal.user.toString() !== req.user._id.toString()) {
    //Unauthorized
    res.status(401)
    throw new Error('User not authorized')
  }

  //Delete Goal
  await goal.remove()

  //Status 200 = OK
  res.status(200).json({_id: req.params.id})
})

module.exports = {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal
}