import axios from 'axios'

//Post url/endpoint for createGoal
//"proxy" in frontend package.json sets base url to: "http://localhost:5000"
//GoalAPI_URL will be: "http://localhost:5000/api/goals"
const GoalAPI_URL = '/api/goals/'

//Create a goal as current user
const createGoal = async (goalData, token) => {
  //Object with authorization header that contains the json web token to get past protected routes
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  //Post request to send (goal endpoint, goal form data, authorization header with token)
  const response = await axios.post(GoalAPI_URL, goalData, config)
  //Return axios response.data
  return response.data
}

//Get all goals from current user
const getGoals = async (token) => {
  //Object with authorization header that contains the json web token to get past protected routes
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  //Get request to send (goal endpoint, authorization header with token)
  const response = await axios.get(GoalAPI_URL, config)
  //Return axios response.data
  return response.data
}

//Delete goal based on goal._id from current user
const deleteGoal = async (_id, token) => {
  //Object with authorization header that contains the json web token to get past protected routes
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  //Get request to send (goal endpoint + goal._id to be deleted, authorization header with token)
  const response = await axios.delete(GoalAPI_URL + _id, config)
  //Return axios response.data
  console.log('A', response.data)
  return response.data
}

//Export object holding axios http functions
const goalHttp = {
  createGoal,
  getGoals,
  deleteGoal
}

export default goalHttp