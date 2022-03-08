import {useDispatch} from 'react-redux'
import {deleteGoal} from '../features/goalReducer/goalSlice.js'

//Goal component
function Goal({goal}) {
  const dispatch = useDispatch()

  //Return the destructured goal prop as a div with the goal creation date and text 
  return (
    <div className="goal">
      <div>
        {new Date(goal.createdAt).toLocaleString('en-US')}
        <h2>{goal.text}</h2>
        <button 
          onClick={()=> dispatch(deleteGoal(goal._id))}
          className="close">X
        </button>
      </div>
    </div>
  )
}

export default Goal