const express = require('express')
//Import express router
const router = express.Router()

//Import controllers module for goals
const { createGoal, getGoals, updateGoal, deleteGoal } = require('../controllers/goalController.js')

//Import middleware for route protection (json web token authentication)
const {protect} = require('../middlware/authMiddleware.js')

//Routes
router.route('/')
  //Protected routes
  .post(protect, createGoal)
  .get(protect, getGoals)

router.route('/:id')
  //Protected routes
  .put(protect, updateGoal)
  .delete(protect, deleteGoal)


module.exports = router