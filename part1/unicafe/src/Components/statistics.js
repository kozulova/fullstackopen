import React from 'react'

function Statistics({good, bad, neutral}) {
    return (
        <div>
    <Statistic text="good" value={good}/>
    <Statistic text="neutral" value={neutral}/>
    <Statistic text="bad" value={bad}/>
    <Statistic text="all" value={good+bad+neutral}/>
    <Statistic text="average" value={((good+bad+neutral)/good).toFixed(2)}/>
    <Statistic text="positive" value={(good/(good+bad+neutral)*100).toFixed(2)}/>
    </div>
    )
}

function Statistic({text, value}){
    return(
        <p>{text} {value}</p>
    )
}

export default Statistics
