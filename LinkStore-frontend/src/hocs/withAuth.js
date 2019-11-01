import React,{Component} from 'react'
import {connect} from 'react-redux'


export default function  withAuth (ChangedComponent) {
    class Authenticate extends Component {
        componentWillMount(){
            if(!this.props.isAuthenticated){
                this.props.history.push('/')

            }
        }
        componentWillUpdate(nextProps){
            if(nextProps.props.isAuthenticated){
                this.props.history.push('/')

            }
        }

        render () {
            return <ChangedComponent {... this.props} />
        }

    }


function mapStateToProps (state) {
    return {isAuthenticated: state.currentUser.isAuthenticated}
}
return connect(mapStateToProps)(Authenticate)
}