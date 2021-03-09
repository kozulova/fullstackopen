const initialState = {
    text: ""
}

const notificationReducer = (state=initialState, action) => {
    switch(action.type){
        case 'SHOW_NOTIFICATION':
            return {text: action.data.text}
        case 'CLEAR_NOTIFICATION':
            return initialState    
        default:
            return initialState    
    }
}


export default notificationReducer