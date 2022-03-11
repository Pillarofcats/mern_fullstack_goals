import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
//Import components
import GoalForm from '../components/GoalForm.jsx'
import Loading from '../components/Loading.jsx'
import Goal from '../components/Goal.jsx'
//Reducer functions for goals
import {getGoals, reset} from '../features/goalReducer/goalSlice.js'

//Dashboad Page
function Dashboard() {
  //React router hooks
  const navigate = useNavigate()
  // const location = useLocation()

  //Dispatch user goals with useDispatch
  const dispatch = useDispatch()

  //Get user attribute from 'auth' state in redux store in store.js
  const {user} = useSelector((state) => {
    return state.auth
  })

  //Get goals attribute from 'goal' state in redux store in store.js
  const {goals, isLoading, isError, message} = useSelector((state) => {
    // console.log('store goal state', state.goal)
    return state.goal
  })

  //Render on state change (user, navigate)
  useEffect(() => {
    //Error check for 'goal' state
    if(isError) {
      console.log(message)
    }

    //Return to login page if not logged in as a user
    if(!user) {
      navigate('/login')
    }

    //Get list of user goals on render/state change
    if(user) {
      dispatch(getGoals())
    }

    //Reset state on unmount of Dashboard page (when navigating out of Dashboard)
    return () => {
      dispatch(reset())
    }

  }, [user, navigate, isError, message, dispatch])

  //Check for loading state
  if(isLoading) {
    return <Loading />
  }

  return (
    <React.Fragment>
      <section className ='heading'>
        <h1>Hello {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className="content">
        {goals.length > 0 ? <div className="goals">
          {
            goals.map((goal) => (
              <Goal key={goal._id} goal={goal} />
            ))
          }
        </div> : (<h3>No goals have been submitted</h3>)}
      </section>
    </React.Fragment>

  )
}

export default Dashboard