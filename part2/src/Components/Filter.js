import React from 'react'

const Filter = (props) => {
    return (
        <div>
            <div>filter shown with </div>
            <input type="text" value={props.filter} onChange={props.handleFilter}/>
        </div>
    )
}

export default Filter
