import React,{PureComponent,Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {searchForLinks,genericDispatch} from '../../store/actions/allLinks'

class SearchBox extends PureComponent{
    constructor (props) {
        super(props)
        this.state = {
            value: '',
            userid:'',
            isAuthenticated:''

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {filter, genericDispatch} = this.props
        this.setState({value: event.target.value});
        if(filter){
            genericDispatch({type:'FILTER_RESULT',filter:event.target.value})
        }
      }
      handleSubmit(event) {
        event.preventDefault();
        const {linkid, history, genericDispatch, searchForLinks} = this.props
        if(!linkid.isAuthenticated){
            alert('Please sigin or signup to use the search feature')
            history.push('/signin')
            return;
        }
        genericDispatch({type:'CLEAR_FILTER_RESULT'})
        searchForLinks({...this.state,userid:linkid.user.id,isAuthenticated:linkid.isAuthenticated})
        .then(() => {
                this.setState({value:''})
                history.push('/searchresults')
            })
    
      }
    render (){
        return(
            <div style={{width:'100%'}}>
               <form className="row" onSubmit={this.handleSubmit}>
                <div className="input-group col-md-12 col-sm-12">
                    <input className="form-control py-2 " type="search" value={this.state.value} placeholder={this.props.placeholderValue} onChange={this.handleChange}></input>
                    {this.props.showButton ?
                    <Fragment>
                        <span className="input-group-append">
                           <button className="btn btn-outline-secondary" type="submit">
                            <i className="fa fa-search"></i>
                        </button>
                       </span> 
                    </Fragment>
                    : '' 
                    } 
                </div>

                </form>
            </div>
        )
    }
}


function MapStateToProps(state){
    return{
        linkid:state.currentUser
    }
}
export default withRouter(connect(MapStateToProps,{genericDispatch,searchForLinks})(SearchBox))