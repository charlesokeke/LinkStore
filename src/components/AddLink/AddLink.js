import React,{Component} from "react"
//import SearchBox from '../../containers/SearchBox/SearchBox'
import {connect} from 'react-redux'
import Links from '../Links/Links'
import './AddLink.css'
import {postNewLinks,getAllUserLinks} from '../../store/actions/allLinks'


const style = {
    signupbox:{
        borderTop:'none',
        borderLeft:"none",
        borderRight:"none",
        borderRadius:'0px'
    },
    ulBox:{
        padding:'0px',
        margin:'0px'
    },
    ulContent:{
        listStyleType:'none'
    }
}

class Addlink extends Component{
    constructor (props) {
        super(props)
        this.state = {
            public:true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount (){
        this.props.getAllUserLinks({})
        document.getElementById('customRadioInline1').value = 'on'
        window.scrollTo(0,0)

       
    }
    componentWillUpdate(nextProps){

    }
    handleChange(event) {
        let {value, id} = event.target
        let data = true
        if(value === "on" && id === 'customRadioInline1' ){
            data = true
        }else if (value === 'on' && id === 'customRadioInline2'){
            data = false
        }else{
            data = value.toLowerCase()
        }
        this.setState({[event.target.name]: data});
      }
      handleSubmit(event) {
         
        event.preventDefault();
        if(!/^(ftp|http|https):\/\/[^ "]+$/.test(this.state.url)){
            var choice = window.confirm('Invalid Url please check your url entry.Press Ok to continue or cancel to quit')
            if(!choice){
                this.setState({url:''})
                return
            }
        }
        this.props.postNewLinks(this.state).then((message) => {
        
            this.props.history.push('/')
            
        }).catch(err => {
            return
        })
        
      }

    render () {
        const {id,errors,currentUser,userLinks,username,history} = this.props 
        console.log(errors) 
        if(!currentUser.isAuthenticated){
            history.push('/')
        }
        console.log(this.state)
        return (
            
            <div className="container addlink-container mt-5">
                
                <div style={{flex:'1', padding:'10px'}}>
                
                <h4 className='text-left ' style={{textTransform:'uppercase',color:"#666666"}}> Add Url</h4>
                <form onSubmit={this.handleSubmit}>
                    {errors.message ? <div className="alert alert-danger">{errors.message}</div> : ""}
                    <div className="form-group row">
                        <div className="col-sm-12">
                        <input type="text" className="form-control"  value={this.state.url} onChange={this.handleChange} name="url" placeholder="Enter URL" style={style.signupbox} required/>
                        </div>
                    </div>
                    
                    <div className="form-group row">
                        <div className="col-sm-12">
                        <input type="text" className="form-control" name="website" onChange={this.handleChange} placeholder="Enter website name for example Google" style={style.signupbox}required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-12">
                        { /** <input type="text" className="form-control" name="urld" onChange={this.handleChange} placeholder="Enter url description" style={style.signupbox}/>*/}
                        <textarea class="form-control" name="urld" rows="3" placeholder="Enter url description" onChange={this.handleChange} required />
                        </div>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" onChange={this.handleChange}  id="customRadioInline1" name="public" className="custom-control-input" />
                            <label className="custom-control-label" htmlFor="customRadioInline1">Public</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" onChange={this.handleChange}  id="customRadioInline2" name="public" className="custom-control-input" />
                            <label className="custom-control-label" htmlFor="customRadioInline2">Private</label>
                     </div>
                    <p><button className="btn btn-md btn-primary" type="submit"> Submit</button></p>
                </form>

                </div>
                <div style={{flex:'1', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                    <h4 className="lead text-bold text-center" style={{textTransform:'capitalize'}}> 
                            {
                             userLinks.length ? "Recent entries" :
                             "You currently have no public or private entries"
                            }
                    </h4>
                    <div className='links-container'>
                    <ul style={style.ulBox}>
                        {this.props.userLinks.map((el,key) => (
                             <Links
                                website={el.urlSource}
                                text={el.urlDescription} 
                                date={el.createdAt} 
                                username={this.props.username}
                                key={key}
                                url={el.url}
                                userid={id}
                                dataid={el.user._id}
                                isAuthenticated={currentUser.isAuthenticated }
                                updateid={el._id}
                                profileImageUrl={el.user.profileImageUrl}
                            />
                        ))}
                        
                    </ul>
                    </div>
                </div>
                
            </div>
        
        ) 

    }
}
function mapStateToProps(state){
    return {
        errors:state.errors,
        userLinks:state.publicLinks.allUserLinks,
        id:state.currentUser.user.id,
        username: state.currentUser.user.username
    }

}
export default connect(mapStateToProps,{postNewLinks,getAllUserLinks})(Addlink)