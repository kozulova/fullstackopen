import React from 'react'

function Part(props) {
    return (
        <div>
            <p>
        {props.part} {props.exercises}
      </p>
        </div>
    )
}

export default Part
