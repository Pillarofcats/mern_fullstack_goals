/*Response data returned from authentication
  _id:
  name:
  email:
  token:
*/

//Redux imports
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
//Axios authHttp register file import
import authHttp from './authHttp.js'

//Get user from local storage (only strings, so parse)
const user = JSON.parse(localStorage.getItem('user'))

//Initial state for user
const initState = {
  //If user in local storage then use that, else user is null
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

//Register user (action: auth/register)
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  //(user) passed in from register component
  try {
    //Returning response payload authHttp
    return await authHttp.register(user)
  } catch(error) {
    //Response message from server
    const message = (error.response && error.response.data && error.response.data.message) 
      || error.message || error.toString()

    //Error will be the payload for the reducer
    return thunkAPI.rejectWithValue(message)
  }
})

//Logout user that is currently logged in, remove user from local storage (note: should be done through server)
export const logout = createAsyncThunk('auth/logout', async () => {
  await authHttp.logout()
})

//Login user (action: auth/login)
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  //(user) passed in from register component
  try {
    //Returning response payload authHttp
    return await authHttp.login(user)
  } catch(error) {
    //Response message from server
    const message = (error.response && error.response.data && error.response.data.message) 
      || error.message || error.toString()

    //Error will be the payload for the reducer
    return thunkAPI.rejectWithValue(message)
  }
})

//Create redux slice for authentication (Slices are NOT async)
export const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  //Not async
  //Do not modify existing state by mutating, instead make a copy of state and mutate the copy
  reducers: {
    //Reset state to initial values (dispatch function)
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    //Cases
    builder
      //REGISTER
      //Pending
      .addCase(register.pending, (state) => {
        //Fetching data
        state.isLoading = true
      })
      //Fullfilled
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        //Setting state user to the response payload from register function which gets data from API call (authHttp.js)
        state.user = action.payload
      })
      //Rejected
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user = null
        //Setting state message to the reponse payload from register function which gets data from API call (authHttp.js)
        state.message = action.payload
      })
      //LOGIN
      //Pending
      .addCase(login.pending, (state) => {
        //Fetching data
        state.isLoading = true
      })
      //Fullfilled
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        //Setting state user to the response payload from register function which gets data from API call (authHttp.js)
        state.user = action.payload
      })
      //Rejected
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user = null
        //Setting state message to the reponse payload from register function which gets data from API call (authHttp.js)
        state.message = action.payload
      })
      //LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  }
})

//Redux toolkit exports
export const {reset} = authSlice.actions
export default authSlice.reducer