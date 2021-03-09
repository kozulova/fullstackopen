import React from 'react'
import ReactDOM from 'react-dom'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import anecdoteService from './services/anecdoteService'



anecdoteService.getAll().then(anecdotes=>anecdotes.forEach(anecdote=>{
  store.dispatch({type: 'NEW_ANECDOTE', data: anecdote})
}))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)