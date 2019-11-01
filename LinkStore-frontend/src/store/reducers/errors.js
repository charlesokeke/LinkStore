import {ADD_ERROR, REMOVE_ERROR} from '../actionTypes'
export default (state = {message:"",showModal:true}, action) => {
    switch(action.type){
        case ADD_ERROR:
            return {...state, message:action.error}
        case REMOVE_ERROR:
            return{...state,message:""}
        case "CLOSE_MODAL": 
            return {...state,showModal:action.closeModal}

        default:
            return state

    }
}