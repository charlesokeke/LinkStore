import React,{Component} from 'react';
import {Provider} from 'react-redux'
import configureStore from '../store'
import {BrowserRouter as Router} from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Footer from "../components/Footer/Footer"
import Main from './Main/Main'
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode'
const store = configureStore()
if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken)
   try{
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
   }catch(error){
      store.dispatch(setCurrentUser({}))
   }
}

class App extends Component {
  render () {
    return (
      <div style={{width:'100%', minHeight:'100vh', position:"relative" ,paddingBottom:'100px'}}> 
        <Provider store={store}>
        <Router>
          <div >
            <Navbar />
            <Main />
            <Footer />
          </div>
        </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
