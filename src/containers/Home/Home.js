import React, {PureComponent} from 'react'
import { connect } from  "react-redux"
import { Link } from 'react-router-dom'
//import SearchBox from '../SearchBox/SearchBox'
import './HomeCss.css'
import Links from '../../components/Links/Links'
//import MessageModal from '../MessageModal/MessageModal'
import {getAllPublicLinks} from '../../store/actions/allLinks'

class Home extends PureComponent {
    componentDidMount (){
        this.props.getAllPublicLinks({})
        console.log('component did mount is called')
    }
    render () {
        console.log('render is called')
        const {id, publicLinks, currentUser } = this.props

        return(
            <div className="container text-center d-flex justify-content-center align-items-center">
                <div className="links-container">
                {/** this.props.currentUser.isAuthenticated ? 
                <div className="alert alert-success">{`Welcome ${this.props.currentUser.user.username}`.toUpperCase()}</div> 
                : "" */}
                {/** <MessageModal />*/}
                <h2 style={{fontFamily:"'Poppins', sans-serif"}}> Welcome to <span class="btn btn-primary btn-lg" style={{cursor:'none'}}>LinkStore</span></h2>
                <h6 style={{fontFamily:"'Poppins', sans-serif",color:"#323232",fontSize:'13px'}}> Store, update, delete and search webpage links</h6>

                    <ul style={{padding:'0px', margin:'0px'}}>
                        {publicLinks.map((el,key) => (
                            <Links 
                                website={el.urlSource}
                                text={el.urlDescription} 
                                date={el.createdAt} 
                                username={el.user.username}
                                key={key}
                                url={el.url}
                                userid={id}
                                dataid={el.user._id}
                                isAuthenticated={currentUser.isAuthenticated }
                                updateid={el._id}
                                profileImageUrl={el.user.profileImageUrl}
                             />

                        ))}
                        {currentUser.isAuthenticated ? <li style={{listStyle:'none', padding:"10px"}}><Link to={`/addurl/${currentUser.user.id}`} className="text-white btn btn-primary btn-md btn-block">ADD URL</Link></li> : ""}
                    </ul>
                </div>
            </div>
        )
    }
    
}

function mapStateToProps (state){
    return {
        publicLinks: state.publicLinks.allPublicLinks,
        foundLinks: state.publicLinks.allPublicLinks,
        id:state.currentUser.user.id
    }
}
export default connect(mapStateToProps,{getAllPublicLinks})(Home)