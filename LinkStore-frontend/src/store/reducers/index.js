import { combineReducers } from "redux";
import currentUser from './currentUser'
import errors from './errors'
import publicLinks from './allPublicLinks'
const rootReducer = combineReducers({currentUser, errors, publicLinks})
export default rootReducer
