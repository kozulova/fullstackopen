import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Persons from './Components/Persons'
import PersonForm from './Components/PersonForm'
import Filter from './Components/Filter'
import Notification from './Components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [newFilter, setnewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:3002/persons')
    .then(res=>{
      setPersons(res.data)
    })
  }, [])

  if(message || error){
    setTimeout(()=>{
      setMessage(null)
      setError(null)
    }, 3000)
  } 

  const personsToShow = newFilter.length>0 ?
   persons.filter(person=>person.name.toLowerCase().indexOf(newFilter.toLowerCase())>-1):persons;

  const handleFilter = (event)=>{
    setnewFilter(event.target.value);

  }

  const handleNumberChange = (event)=>{
    setnewNumber(event.target.value);
  }
  const handleNameChange = (event)=>{
    setNewName(event.target.value);
  }

  const addPerson = (event)=>{
    event.preventDefault();
    const newPerson = {name: newName, number: newNumber}
    const person = persons.find(person=>person.name===newName)
    if(person){
      const ask = window.confirm(`${newName} is already to phonebook, replace the old number with new one?`)
      
      if(ask){
        const url = `http://localhost:3002/persons/${person.id}`
        axios.put(url, newPerson)
        .then(res=>{
          setPersons(persons.map(p=>p.id!==person.id?p:res.data))
        })
      } 

    }
    else if(newName===''||newNumber===''){
      alert(`Please add name and number`);
    }
    else{
      axios.post('http://localhost:3002/persons', newPerson)
      .then(res=>{
        setPersons(persons.concat(res.data));
        setMessage(`${newName} was added to phonebook`)
      } )      
    }  
    setNewName('');
    setnewNumber('');
  }

  const deletePerson = (id)=>{
    const url = `http://localhost:3002/persons/${id}`
    const ask = window.confirm("Delte Arto Hellas")
    if(ask){
      axios.delete(url)
      .then(res=>{
        setPersons(persons.filter(person=>person.id!==id))
      })
      .catch(err=>{
        setError(err.message)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
     <Notification message={message} error={error}/>
      <Filter handleFilter={handleFilter} filter={newFilter}/>
      <PersonForm addPerson = {addPerson}
       handleNameChange={handleNameChange}
       handleNumberChange = {handleNumberChange}
        name={newName} number={newNumber}/>

      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App