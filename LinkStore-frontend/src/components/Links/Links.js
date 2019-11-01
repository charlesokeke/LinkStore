import React, {PureComponent} from 'react'
import Moment from 'react-moment'
import { Link, withRouter } from 'react-router-dom'
import {connect} from  'react-redux'
import {removeThatLink,getAllPublicLinks} from '../../store/actions/allLinks'
import ReactTooltip from 'react-tooltip'
import './LinkCss.css'


class  Links extends PureComponent{
    removeLink (id){
        this.props.removeThatLink(id) 
        setTimeout(() => {
            this.props.getAllPublicLinks({})
        },50)  
    }
    shortenDescriptionText = (textDescription) => {
        if(textDescription !== undefined){
            return textDescription.length > 130 ? `${textDescription.slice(0,130)}...` : textDescription
        }
        return []
    
    }
    shortenUsernameText = (usernameText) => {
        if(usernameText !== undefined){
            return usernameText.length > 15 ? `${usernameText.slice(0,15)}...` : usernameText

        }

    }
        
    render (){
        const {website, date, username, text,url,userid, dataid,isAuthenticated,updateid,profileImageUrl} = this.props
         return (
        <li style={{listStyleType:'none'}}>
                  <div className="container mt-3">
                      <ReactTooltip type="info" className="tooltip-width"/>
                      <div className="media border p-3 b-shadow" style={{position:'relative', borderRadius:'5px'}}>
                        <small style={{position:"absolute", top:"5px", right:"12px"}} className="text-mute">
                          {website}
                        </small>
                        <img src={profileImageUrl || "https://img.icons8.com/bubbles/2x/user.png"} alt="pic" className="mr-3 mt-3 rounded-circle" width="64" height="64" />
                       <div className="media-body">
                            <p className="text-left  mb-0 mt-1 capitalize" style={{opacity:"0.8",fontWeight:"600",fontFamily:"Poppins, sans-serif",opacity:"0.9",letterSpacing:"normal"}}>
                                {this.shortenUsernameText(username)} 
                             <br/>
                              <small> 
                                  <span style={{color:"#666"}}><Moment fromNow>{date}</Moment></span>
                              </small>
                            </p>
                            <p className="text-left">
                               <a href={/^(ftp|http|https):\/\/[^ "]+$/.test(url) ? url: '/'}
                                    data-tip={text.length !== this.shortenDescriptionText(text).length ? text : null}
                                    target='_blank' 
                                    rel="noopener noreferrer" 
                                    style={{fontSize:"12px", textDecoration:'none',lineHeight:"1.6",cursor:"pointer",letterSpacing:"normal",fontWeight:"600"}}>
                                    {this.shortenDescriptionText(text)}
                               </a>
                            </p> 
                            <div style={{display:'flex',flexDirection:'row-reverse'}}>
                              {(userid === dataid && isAuthenticated) && <span className="btn btn-sm btn-success ml-1"><Link to={`/update/${updateid}`} className="text-white" style={{textDecoration:"none"}}>update</Link></span>}
                              {(userid === dataid && isAuthenticated) && <button onClick={this.removeLink.bind(this,updateid)} className="btn btn-danger btn-sm" >delete</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </li>
    )
    }
}
function mapStateToProps (state){
    return{
        user:state.currentUser
    }
}
export default withRouter(connect(mapStateToProps,{removeThatLink,getAllPublicLinks})(Links))