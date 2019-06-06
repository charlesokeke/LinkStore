import React,{PureComponent} from 'react'
import {connect} from 'react-redux'
import {getUpdateForLink,postUpdateForLink} from '../../store/actions/allLinks'

const style = {
    signupbox:{
        borderTop:'none',
        borderLeft:"none",
        borderRight:"none",
        borderRadius:'0px'
    }
}
class UpdateLink extends PureComponent{
    constructor (props) {
        super(props)
        this.state = {
            public:'',
            url:"",
            urld:'',
            website:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount () {
        this.props.getUpdateForLink(this.props.match.params.id)
    
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            public:'',
            id:nextProps.currentUpdateLinkdata[0]._id,
            url:nextProps.currentUpdateLinkdata[0].url,
            urld:nextProps.currentUpdateLinkdata[0].urlDescription,
            website:nextProps.currentUpdateLinkdata[0].urlSource
        })
    }

    handleChange(event) {
        let {value, id} = event.target
        let data = true
        if(value === "on" && id === 'customRadioInline1' ){
            data = true
        }else if (value === 'on' && id === 'customRadioInline2'){
            data = false
        }else{
            data = value
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
        this.props.postUpdateForLink(this.state.id,this.state)
        this.props.history.push('/')
        
      }

    render () {
        if(!this.props.isAuthenticated){
            this.props.history.push('/')
        }
        
        
        return(
            <div className="container addlink-container mt-5">
                
                <div style={{flex:'1', padding:'10px'}}>
                
                <h4 className='text-left'>Update Entry</h4>
                <form onSubmit={this.handleSubmit}>
                    {this.props.errors ? <div>{this.props.errors.message}</div> : ""}
                    <div className="form-group row">
                        <div className="col-sm-12">
                        <input type="text" class="form-control"  value={this.state.url} onChange={this.handleChange} name="url" placeholder="Enter URL" style={style.signupbox}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-12">
                        <input type="text" className="form-control" value={this.state.urld} name="urld" onChange={this.handleChange} placeholder="Enter url description" style={style.signupbox}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-12">
                        <input type="text" className="form-control" value={this.state.website} name="website" onChange={this.handleChange} placeholder="Enter website name" style={style.signupbox}/>
                        </div>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" onChange={this.handleChange}  id="customRadioInline1" name="public" className="custom-control-input"/>
                            <label className="custom-control-label" htmlFor="customRadioInline1">Public</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" onChange={this.handleChange}  id="customRadioInline2" name="public" className="custom-control-input"/>
                            <label className="custom-control-label" htmlFor="customRadioInline2">Private</label>
                     </div>
                    <p><button className="btn btn-md btn-primary" type="submit"> Submit</button></p>
                </form>

                </div>
                
                
            </div>
        
        )
    }


}
function mapStateToProps (state) {
    return {
        currentUpdateLinkdata: state.publicLinks.getUpdateLink,
        isAuthenticated: state.currentUser.isAuthenticated
    }
}
export default connect(mapStateToProps,{getUpdateForLink,postUpdateForLink})(UpdateLink)