import React from 'react'
import Person from './Person'

const Persons = ({persons, deletePerson}) => {
    return (
        <div>
            {persons.map(person=>
            (
                <Person person={person} deletePerson={deletePerson} key={person.id}/>    
            ))}
        </div>
    )
}

export default Persons
