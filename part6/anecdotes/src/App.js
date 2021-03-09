import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './components/Notification'
import {asObject} from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes.slice().sort((a,b)=>a.votes < b.votes ? 1: a.votes>b.votes? -1: 0)
  })

  const notificationText = useSelector(state=>{
      //setTimeout(()=>dispatch({type: 'CLEAR_NOTIFICATION'}), 5000)
      return state.notification.text!==""?state.notification.text: null
    })

  

  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({type: 'VOTE', data: {id}})
    dispatch({type: 'SHOW_NOTIFICATION', data: {text: `${id} Note was liked`}})
  }
  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = asObject(event.target.anecdote.value)
    event.target.anecdote.value = ''
    dispatch({type: 'NEW_ANECDOTE', data: anecdote})
  }

  return (
    <div>
    {notificationText&&<Notification notificationText={notificationText}/>}
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App