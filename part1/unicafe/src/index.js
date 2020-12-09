import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Statistics from './Components/statistics'
import Button from './Components/button'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
     <h1>give feedback</h1>
     <Button text="good" click={()=>setGood(good+1)}/>
     <Button text="bad" click={()=>setBad(bad+1)}/>
     <Button text="neutral" click={()=>setNeutral(neutral+1)}/>

     <h2>statistic</h2>
     {good!==0||bad!==0||neutral!==0?<Statistics good={good} bad={bad} neutral={neutral}/>:<p>no feedback given</p>}
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)