import React from 'react'

const PersonForm = (props) => {
    return (
        <div>
         <form>
        <div>
          name: <input value={props.name} onChange={props.handleNameChange}/>
          <br/>
          number: <input value={props.number} onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={props.addPerson}>add</button>
        </div>
      </form>    
        </div>
    )
}

export default PersonForm
