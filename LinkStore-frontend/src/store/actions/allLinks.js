import {apiCall} from '../../services/api'
import {addError,removeError} from './errors'
import {GET_ALL_PUBLIC_LINKS,ALL_USER_LINKS, REMOVE_LINK,GET_LINK_FOR_UPDATE,SET_UPDATE_FOR_LINK,SEARCH_LINKS, SEARCHED_USER_LINKS} from '../actionTypes'

export function setAllPublicLinks (data){
   return { type:GET_ALL_PUBLIC_LINKS,
            allLinks:data
   }
}

export function postUpdateForLinkInSate(data){
    return {
        type:SET_UPDATE_FOR_LINK,
        postUpdate:data
    }
}

export function setAllUserLinks (data){
    return { type:ALL_USER_LINKS,
             userLinks:data
    }
 }
 export function removeLink (data) {
     return {
         type:REMOVE_LINK,
         linkRemoved:data
         
     }
 }
 export function searchLinks(data){
     return {
         type:SEARCHED_USER_LINKS,
         foundLinks:data
     }
 }
 export function getUpdateLink(data) {
    return{
        type:GET_LINK_FOR_UPDATE,
        getUpdateLink:data
    }
 }
 
export const postNewLinks = links => (dispatch, getState) => {
    const {currentUser} = getState()
    const id = currentUser.user.id
    return apiCall('post', `/api/users/${id}/links`, links).then(res => {}).catch(error => {
        dispatch(addError(error.message))
    })

}
export const getAllPublicLinks = links => (dispatch) => {
    return apiCall('get', `/api/links`, links).then(res => {
        dispatch(setAllPublicLinks(res))

    }).catch(error => {
        dispatch(addError(error.message))
    })

}
export const getAllUserLinks = links => (dispatch,getState) => {
    const {currentUser} = getState()
    const id = currentUser.user.id
    return apiCall('get', `/api/users/${id}/links/${id}`, links).then(res => {
        dispatch(setAllUserLinks(res))

    }).catch(error => {
        dispatch(addError(error.message))
    })

}
export const removeThatLink = (updateid) => (dispatch,getState) => {
    const {currentUser} = getState()
    const id = currentUser.user.id
    return apiCall('delete', `/api/users/${id}/links/${updateid}`,{}).then(res => {
        dispatch(removeLink(res))

    }).catch(error => {
        dispatch(addError(error.message))
    })

}
export const getUpdateForLink = (updateid) => (dispatch,getState) => {
    const {currentUser} = getState()
    const id = currentUser.user.id
    return apiCall('get', `/api/users/${id}/links/update/${updateid}`,{}).then(res => {
        dispatch(getUpdateLink(res))

    }).catch(error => {
        dispatch(addError(error.message))
    })

}
export const postUpdateForLink = (updateid,linkData) => (dispatch,getState) => {
    const {currentUser} = getState()
    const id = currentUser.user.id
    return apiCall('put', `/api/users/${id}/links/updatelink/${updateid}`,linkData).then(res => {
        dispatch(postUpdateForLinkInSate(res))

    }).catch(error => {
        dispatch(addError(error.message))
    })

}
export const searchForLinks = (searchData) => (dispatch, getState) =>{
    dispatch(removeError())
    const {currentUser} = getState()
    const id = currentUser.user.id
    console.log(searchData)
    return apiCall('post', `/api/users/${id}/links/searchlink/${id}`, searchData).then(res => {
        if(res.length === 0)dispatch(addError('No result found'))
        dispatch(searchLinks(res))

    }).catch(error => {
        dispatch(addError(error.message))
    })
}

export const genericDispatch = (payload) => (dispatch) => {
    dispatch(payload)
}

