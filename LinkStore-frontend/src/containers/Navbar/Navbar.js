import React,{PureComponent,Fragment} from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {logout} from '../../store/actions/auth'
import SearchBox from '../SearchBox/SearchBox'



const style = {
        linkStyle:{
            listStyleType:"none", 
            display:"inline",
            padding:'0.5rem'
    },
         ulTagDefault:{
            padding:"0px",
            margin:"0px",
            display:'flex',
            alignItems:'center',
            flexDirection:'row'
    },
        innerLink: {
            color:"#fff",
            lineHeight:"1.6",
            fontWeight:'600',
            opacity:"0.9",
            textDecoration:'none',
            cursor:"pointer"

        },
        userGreetingBox:{
        position:'absolute',
        bottom:'-50px',
        padding:'10px',
        display:'flex',
        justifyContent:'center',
        width:'100%',
        opacity:'1'
    }
}
class Navbar extends PureComponent {
    state={
        animateGreetings: 'bounceInDown'
    }

    logout = (e) => {
        e.preventDefault()
        this.props.logout()
    }
    navBarContent = (text,path) =>{
        return this.props.isAuthenticated ? "" :
        <li style={style.linkStyle}><Link to={`/${path}`} style={style.innerLink}>{text}</Link></li>
    }
    componentWillReceiveProps (nextProps) {
            if(nextProps.isAuthenticated){
                setTimeout(() => {
                    this.setState({animateGreetings:'bounceOutUp'})
                },10000)
            }else{
                this.setState({animateGreetings:'bounceInDown'})
            }
        
    }
    render() {
        const {username, isAuthenticated, id} = this.props
        return (
            <div style={{position:'relative',boxShadow: " 0 2px 3px #ccc"}}>
                <div style={style.userGreetingBox}>
                { this.props.isAuthenticated ? 
                    <span className={`btn btn-md  bg-primary text-white animated ${this.state.animateGreetings}`}>{` Hello ${username.charAt(0).toUpperCase() + username.slice(1)} !`}</span> : ''}
                </div>
                <div className="container-fluid bg-primary d-flex justify-content-end align-items-center p-1">
                    <ul className="mr-auto" style={style.ulTagDefault}>                        
                        <li style={style.linkStyle}><NavLink to="/" className="text-white" style={style.innerLink}>LinkStore</NavLink></li>
                        {/** this.props.isAuthenticated ? <li style={style.linkStyle} className="text-white">{` Welcome ${this.props.username}`}</li> : ''*/}
                        <li style={style.linkStyle}><SearchBox placeholderValue={'Search by site name'} showButton={true}/></li>
                    </ul>
                    <ul style={style.ulTagDefault}>
                        {this.navBarContent('Login',"signin")}
                        {this.navBarContent('Signup',"signup")}
                        {isAuthenticated ?
                        <Fragment><li style={style.linkStyle}><Link to="" style={style.innerLink} onClick={this.logout}>Logout</Link></li> 
                        <li style={style.linkStyle}><Link to={`/addurl/${id}`} style={style.innerLink} >AddUrl</Link></li> 
                         </Fragment>   
                        : ""}
                    </ul>

                </div>
            </div>
        )
    }
}

function mapStateToProps (state){
    return {
        isAuthenticated: state.currentUser.isAuthenticated,
        username: state.currentUser.user.username,
        id: state.currentUser.user.id
    }
}
export default connect(mapStateToProps,{logout})(Navbar)