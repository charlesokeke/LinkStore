import {GET_ALL_PUBLIC_LINKS, 
        CLEAR_FILTER_RESULT, 
        SEARCH_LINKS,
        SEARCHED_USER_LINKS,
        ALL_USER_LINKS,
        REMOVE_LINK,
        GET_LINK_FOR_UPDATE,
        SET_UPDATE_FOR_LINK, 
        FILTER_RESULT
    } from  "../actionTypes"

const initialState = {
        allPublicLinks:[],
        foundLinks:[],
        searchedPublicLinks:[],
        searchedUserLinks:[],
        allUserLinks:[],
        removeLink:'',
        getUpdateLink:{},
        updatedLink:{},
        filterResult:[]
    }
export default function (state=initialState, action){
    switch(action.type){
        case GET_ALL_PUBLIC_LINKS:
            return {
                ...state, 
                allPublicLinks:action.allLinks
            }
        case SEARCH_LINKS:
            return {
                ...state, 
                allPublicLinks:state.allPublicLinks.filter(element => element.urlSource.includes(action.foundLinks))
            }
        case SEARCHED_USER_LINKS:
            return {
                ...state, 
                foundLinks:action.foundLinks
            } 
        case ALL_USER_LINKS:
            return {
                ...state,
                 allUserLinks:action.userLinks
                }
        case REMOVE_LINK:
            let userL = state.allPublicLinks.filter(element => element._id !== action.linkRemoved._id)
            let userA = state.allUserLinks.filter(element => element._id !== action.linkRemoved._id)
            let filterContainer = state.foundLinks.filter(element => element._id !== action.linkRemoved._id)
            return {
                ...state,
                removeLink:action.linkRemoved,
                allPublicLinks:userL, 
                allUserLinks:userA,
                foundLinks:filterContainer
                } 
        case GET_LINK_FOR_UPDATE:
            return {
                ...state,
                getUpdateLink:action.getUpdateLink
            } 
        case SET_UPDATE_FOR_LINK:
            return {
                ...state,
                updatedLink:action.postUpdate
            }
        case FILTER_RESULT:
            return {
                ...state, 
                filterResult: state.foundLinks.filter( (element) => {
                    return element.user.username.includes(action.filter) || element.urlDescription.includes(action.filter)
                })} 
        case CLEAR_FILTER_RESULT:
            return {
                ...state, 
                filterResult:[]}       

        default:
            return state   
    }

}