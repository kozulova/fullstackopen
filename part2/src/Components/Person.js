import React from 'react'

const Person = ({person, deletePerson}) => {
    return (
        <div>
            <li className="persons">{person.name} {person.number}   
            <button onClick={()=>deletePerson(person.id)}>delete</button>
            </li>    
        </div>
    )
}

export default Person
