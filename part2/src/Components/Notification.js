import React from 'react'

const Notification = ({message, error}) => {

    if(message){
        return (
        
            <div className="message">
                {message}
            </div>
        )
    }
    else if(error){
        return (     
            <div className="message error">
                {error}
            </div>
        )
    }
    else{
        return null
    }
    
}

export default Notification
