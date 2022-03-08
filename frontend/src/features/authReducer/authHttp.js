//Allows frontend API calls
import axios from 'axios'

//Post url/endpoint for register
//"proxy" in frontend package.json sets base url to: "http://localhost:5000"
//AuthAPI_URL will be: "http://localhost:5000/api/users"
const AuthAPI_URL = '/api/users/'

//Register user
const register = async (userData) => {
  //Axios.post('url/endpoint', data)
  const response = await axios.post(AuthAPI_URL, userData)

  if(response.data) {
    //localStorage params (id string, data)
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

//Login user
const login = async (userData) => {
  //Axios.post('url/endpoint', data)
  const response = await axios.post(AuthAPI_URL + 'login', userData)

  if(response.data) {
    //localStorage params (id string, data)
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

//Logout user
const logout = () => {
  //Remove 'user' from local storage
  localStorage.removeItem('user')
}

//Export object holding axios http functions
const authHttp = {
  register,
  login,
  logout
}

export default authHttp