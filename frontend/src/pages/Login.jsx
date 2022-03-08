import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

//Components
import Loading from '../components/Loading.jsx'

//Redux slice functions (login, reset)
import {login, reset} from '../features/authReducer/authSlice.js'

//Let users login after having registered to mongoDB
function Login() {
  const [formData, setFormData] = useState({
    email: '',
    pass: ''
  })

  //Destructure form data key/values
  const {email, pass} = formData

  //React router dom useNavigate hook
  const navigate = useNavigate()
  //React redux useDispatch hook
  const dispatch = useDispatch()

  //Destructure reducer 'auth' data from redux state store in store.js
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  //Check if updates need to be made with useEffect
  useEffect(() => {
    //Error, display error message
    if(isError) {
      toast.error(message)
    }

    //Successful registration, navigate to home
    if(isSuccess || user) {
      navigate('/')
    }

    //After a registration occurs call reducer reset function in authSlice.js
    //Reset state fields to initial values
    dispatch(reset())
  },[user, isError, isSuccess, message, navigate, dispatch])

  //Event handler for form
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  //Submit login form
  const onSubmit = (e) => {
    e.preventDefault()
    //User data pulled from login form
    const userData = {
      email: email,
      password: pass
    }
    //Dispatch the login asyncThunk function in authSlice.js
    dispatch(login(userData))
  }

  //If loading, return loading componenet
  if(isLoading) {
    return <Loading />
  }

  return (
    <React.Fragment>
      <section className="heading">
        <h1>
          Login
        </h1>
        <p>Login and set some goals</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input 
              type="email" 
              className="form-control" 
              id='email'
              name='email'
              value={email}
              placeholder='Email'
              onChange={onChange} 
            />
          </div>
          <div className="form-group">
            <input 
              type="text"
              className="form-control" 
              id='pass'
              name='pass'
              value={pass}
              placeholder='Password'
              onChange={onChange} 
            />
          </div>
          <div className="form-group">
            <button type='submit' className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </React.Fragment>
  )
}

export default Login