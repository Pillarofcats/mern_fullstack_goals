//Redux imports
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
//Axios authHttp register file import
import goalHttp from './goalHttp.js'

//Initial 'goal' state for goalSlice
const initState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

//Create a goal from user form data submitted and submit an http request to API endpoint to create the goal in mongoDB
export const createGoal = createAsyncThunk('goals/create', async (goalData, thunkAPI) => {
  try {
    //ThunkAPI can be used to get any state out of the redux store
    //The user attribute in auth state variable in the redux store contains json web token for logged in user
    //Need token for protected route and it contains the user's _id in mongoDB
    const token = thunkAPI.getState().auth.user.token
    //Send goalData and token to API endpoint to pass protected routes
    return await goalHttp.createGoal(goalData, token)
  } catch(error) {
    //Response message from server
    const message = (error.response && error.response.data && error.response.data.message) 
      || error.message || error.toString()
    //Error will be the payload for the reducer
    return thunkAPI.rejectWithValue(message)
  }
})

//Get list of goals from user, the _ passed as the first parameter to the createAsyncThunk function is unused (omitted)
export const getGoals = createAsyncThunk('goals/getAll', async ( _, thunkAPI) => {
  try {
    //ThunkAPI can be used to get any state out of the redux store
    //The user attribute in auth state variable in the redux store contains json web token for logged in user
    //Need token for protected route and it contains the user's _id in mongoDB
    const token = thunkAPI.getState().auth.user.token
    //Send json web token to API endpoint to pass protected routes
    return await goalHttp.getGoals(token)
  } catch (error) {
    //Response message from server
    const message = (error.response && error.response.data && error.response.data.message) 
      || error.message || error.toString()
    //Error will be the payload for the reducer
    return thunkAPI.rejectWithValue(message)
  }
})

//Delete goal from user based on goal._id
export const deleteGoal = createAsyncThunk('goals/delete', async (_id, thunkAPI) => {
  try {
    //ThunkAPI can be used to get any state out of the redux store
    //The user attribute in auth state variable in the redux store contains json web token for logged in user
    //Need token for protected route and it contains the user's _id in mongoDB
    const token = thunkAPI.getState().auth.user.token
    //Send json web token to API endpoint to pass protected routes
    //_id is the goal._id linked to user
    return await goalHttp.deleteGoal(_id, token)
  } catch (error) {
    //Response message from server
    const message = (error.response && error.response.data && error.response.data.message) 
      || error.message || error.toString()
    //Error will be the payload for the reducer
    return thunkAPI.rejectWithValue(message)
  }
})

//Redux state slice 'goal', state can be accessed in redux store in store.js (Slices are NOT async)
export const goalSlice = createSlice({
  name: 'goal',
  initialState: initState,
  reducers: {
    //Reset to initial state
    reset: (state) => initState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGoal.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        //Redux toolkit helper function to push newly created goal into goal state attribute goals: []
        state.goals.push(action.payload)
      })
      .addCase(createGoal.rejected, (state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGoals.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        //Redux toolkit helper function to push newly created goal into goal state attribute goals: []
        state.goals = action.payload
      })
      .addCase(getGoals.rejected, (state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGoal.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        //Remove from UI without having to rerender the page after deleting a goal
        state.goals = state.goals.filter((goal) => goal._id !== action.payload._id)
      })
      .addCase(deleteGoal.rejected, (state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

//Redux toolkit exports
export const {reset} = goalSlice.actions
export default goalSlice.reducer