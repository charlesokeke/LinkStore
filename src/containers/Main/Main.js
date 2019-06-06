import React from "react"
import {Switch, Route, withRouter} from "react-router-dom"
import { connect } from "react-redux"
import Home from '../Home/Home'
import UserAuthForm from '../UserAuthForm/UserAuthForm'
import {authUser} from '../../store/actions/auth.js'
import {removeError,addError} from '../../store/actions/errors'
import AddLink from '../../components/AddLink/AddLink'
import UpdateLink from '../../components/Update/Update'
import searchResults from '../../components/SearchResults/SearchResults'

const Main = (props) => {
    const {authUser,errors ,removeError,currentUser,addError} = props
    return (
        <div className="container" style={{paddingTop:"5rem", paddingLeft:"0px",paddingRight:"0px", paddingBottom:'2.5rem'}}>
            <Switch>
                <Route exact path="/" render={ props => <Home {...props} currentUser={currentUser}/>}></Route>
                <Route exact path="/addurl/:id" render={ props => <AddLink {...props} currentUser={currentUser}/>}></Route>
                <Route exact path="/signup" 
                    render={ props => <UserAuthForm {...props} 
                    heading="Signup" 
                    onAuth={authUser} 
                    errors={errors}
                    removeError={removeError}
                    addError={addError}
                    />
                }
                    
                >
                </Route>
                <Route exact path="/signin" 
                    render={ props => <UserAuthForm {...props} 
                    heading="Signin" 
                    onAuth={authUser} 
                    errors={errors}
                    removeError={removeError}
                    />
                }
                    
                >
                </Route>
                <Route exact path="/update/:id" component={UpdateLink}>

                </Route>
                <Route exact path="/searchresults" component={searchResults}></Route>
            </Switch>
        </div>
    )
}

function mapStateToProps (state){
    return {
        currentUser: state.currentUser,
        errors: state.errors
    }
}
export default withRouter(connect(mapStateToProps,{authUser,removeError,addError})(Main))