import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

//Components
import Loading from '../components/Loading.jsx'

//Redux slice functions (register, reset)
import {register, reset} from '../features/authReducer/authSlice.js'

//Let users register to mongoDB
function Register() {

  //Form data useState
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pass1: '',
    pass2: ''
  })

  //Destructure form data
  const {name, email, pass1, pass2} = formData

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

  //Submit register form
  const onSubmit = (e) => {
    e.preventDefault()
    //Validation check for password upon registering
    if(pass1 !== pass2) {toast.error('Passwords do not match')}
    else {
      //Successful validation, get userData from register form
      const userData = {
        name: name,
        email: email,
        password: pass1
      }
      //Dispatch register(userData) function in authSlice.js
      dispatch(register(userData))
    }
  }

  //If loading, return loading componenet
  if(isLoading) {
    return <Loading />
  }

  return (
    <React.Fragment>
      <section className="heading">
        <h1>
          Register
        </h1>
        <p>Create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              id='name'
              name='name'
              value={name}
              placeholder='Name'
              onChange={onChange} 
            />
          </div>
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
              id='pass1'
              name='pass1'
              value={pass1}
              placeholder='Password'
              onChange={onChange} 
            />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              id='pass2'
              name='pass2'
              value={pass2}
              placeholder='Confirm Password'
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

export default Register