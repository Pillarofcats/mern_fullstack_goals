import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
//Reducer
import {createGoal} from '../features/goalReducer/goalSlice.js'

//GoalForm component (holds user form data to be submitted as a new goal)
function GoalForm() {
  const [text, setText] = useState('')
  //Create dispatch function variable from react-redux
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    //Dispatch the createGoal function in goalSlice.js using redux
    dispatch(createGoal({text}))
    //Reset text useState variable
    setText('')
  }

  return (
    <React.Fragment>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="text">Goal</label>
            <input type="text"
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}/>
          </div>
          <div className="group">
            <button className='btn btn-block' type='submit'>Add Goal</button>
          </div>
        </form>
      </section>
    </React.Fragment>
  )
}

export default GoalForm