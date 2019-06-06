import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Links from '../Links/Links'
import {genericDispatch} from '../../store/actions/allLinks'
import SearchBox from '../../containers/SearchBox/SearchBox'

const SearchResults = (props) =>{
    const {id, data,isAuthenticated, filterResult} = props
    const dataDisplayed = filterResult.length ? filterResult : data
    if(!isAuthenticated){
        props.history.push('/')
    }
    return (
        <div className="container d-flex justify-content-center align-items-center flex-column">
            {data.length ? <SearchBox placeholderValue={'Filter results with username or link descriptions'} showButton={false} filter={true}/> : <h4 className="alert alert-danger"> No results found</h4>}
            <div className="links-container">
            `<ul className="p-0 m-0S">
               {dataDisplayed.map((el,key) => (
                            <Links 
                                website={el.urlSource}
                                text={el.urlDescription} 
                                date={el.createdAt} 
                                username={el.user.username}
                                key={key}
                                url={el.url}
                                userid={id}
                                dataid={el.user._id}
                                isAuthenticated={isAuthenticated }
                                updateid={el._id}
                                profileImageUrl={el.user.profileImageUrl}
                             />
                        ))}
            </ul>
            </div>
        </div>
    )
}
function mapStateToProps (state){
    return {
        data: state.publicLinks.foundLinks,
        filterResult: state.publicLinks.filterResult,
        id:state.currentUser.user.id,
        isAuthenticated:state.currentUser.isAuthenticated,
        error: state.errors.message
    }
}
export default withRouter(connect(mapStateToProps,{genericDispatch})(SearchResults))