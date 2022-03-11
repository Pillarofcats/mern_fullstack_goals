//React icons / font awesome
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/authReducer/authSlice.js'

function Header() {
  //React router
  const navigate = useNavigate()
  //React redux
  const dispatch = useDispatch()
  const {user} = useSelector((state) => {
    //Return reducer state auth from redux store in store.js (auth: authReducer === authSlice in authSlice.js)
    return state.auth
  })

  //Logout user
  const onLogout  = () => {
    //Dispatch logout function in authSlice.js through redux
    dispatch(logout())
    //Dispatch reset function in authSlice.js through redux
    dispatch(reset())
    //Finished logout, return to dashboard
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
        {
          user ? <Link to='/'>Goal Setter</Link> 
              : <Link to='/login'>Goal Setter</Link>
        }
        
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <button className ='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header