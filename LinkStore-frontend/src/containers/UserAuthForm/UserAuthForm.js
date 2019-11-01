import React,{Component} from "react"
import { Link } from 'react-router-dom'
import './UserAuthFormCss.css'


const style = {
    signupbox:{
        borderTop:'none',
        borderLeft:"none",
        borderRight:"none",
        borderRadius:'0px',
        textDirection:'start'
    }
}

class UserAuthForm extends Component{
    constructor (props) {
        super(props)
        this.state = {
            email: '',
            password:'',
            username: '',
            profileImageUrl:'',
            addClass:'',
            fileName:'',
            heading:"",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.onDrop = this.onDrop.bind(this);

    }

    showFileAddedAndRemoveItAfterTwoSeconds = () =>{
        setTimeout(() => {
            this.setState({addClass:'bounceOutUp'})
        },5000)
        
    }
        
   handleChange2 = (evt)  => {
       if(evt.target.files[0].size > 2000){
            alert("Sorry but the file size is too big. Please upload a smaller size or not")
            evt.target.value = ''
            return;
       }
    
        var reader = new FileReader();
        var file = evt.target.files[0];
        reader.onload = (upload) => {
            this.setState({
                profileImageUrl: upload.target.result,
                fileName:file.name,
                addClass:'bounceInDown'
            });
        };
        reader.readAsDataURL(file);
        this.showFileAddedAndRemoveItAfterTwoSeconds()
        this.props.removeError()
    
    }
    
     static getDerivedStateFromProps (nextProps,prevState){

        if(nextProps.heading !== prevState.heading){
            return {
                email:'',
                password:'',
                username:'',
                profileImageUrl:'',
                heading:nextProps.heading
            }
        }else{
            return prevState
        }
    }


    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});

      }
      validateInputs = (stateObject) => {
        var array =  Object.entries(stateObject)
        var keyName;
        var value;
        var error = ''
        for( let element in array){
        keyName = array[element][0]
        value = array[element][1]
        if((keyName === 'username') && (value.length < 8 || value === '')){
            error += " Username cannot be empty and must have a least 8 characters."
        
        }
        if((keyName === 'password') && (value.length < 8 || value === '')){
            error += " Password cannot be empty and must have a least 8 characters."
        
        }
        if(keyName === 'password' && !/^(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value)){
                error += " Password must contain a least one special character and a number."
        }
        if(keyName === 'email' && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)){
            error += " Email must be valid address."
    }
            }
        return error

      }
      handleSubmit(event) {
        event.preventDefault();
        if(this.props.heading !== "Signin"){
            var error = this.validateInputs(this.state)
            if(error){
                this.props.addError(error)
                return;
            }
        }
       
        const authType = this.props.heading === 'Signin' ? 'signin': 'signup'
        this.props.onAuth(authType,this.state).then(() =>{
            this.props.history.push('/')
        }).catch(err => {
            return
        })
      }

    render () {
        console.log(this.props.heading)
        const {email,password,username} = this.state
        this.props.history.listen(() =>{
            this.props.removeError()
        })
        return (
            <div className="container">
            {this.state.profileImageUrl ? 
            <p className={`alert alert-success animated ${this.state.addClass}`}>
               {`Uploaded ${this.state.fileName} as your profile image`}
            </p> : ''}
            <div className={ this.props.errors.message  ? `alert alert-danger` : ''}>{this.props.errors.message}</div> 
            <h4 style={{fontFamily:"'Poppins', sans-serif"}}>{this.props.heading}</h4>
                <form onSubmit={this.handleSubmit} noValidate>
                    {this.props.heading ==='Signin' ?(
                    <div>
                    <div className="form-group row">
                     <div className="col-sm-10">
                        <input 
                            type="Email" 
                            className="form-control" 
                            name="email" 
                            value={email}
                            placeholder="Email" 
                            style={style.signupbox}
                            onChange={this.handleChange}
                            />
                     </div>
                    </div>
                     <div className="form-group row">
                        <div className="col-sm-10">
                            <input 
                            type="password" 
                            className="form-control" 
                            name="password"
                            value={password}
                            placeholder="Password" 
                            style={style.signupbox}
                            onChange={this.handleChange}
                         />
                        </div>
                      </div> 
                    </div>
                    ) :
                    (
                        <div>
                    <div className="form-group row">
                    <div className="col-sm-10">
                    <input 
                        type="Email" 
                        className="form-control" 
                        name="email" 
                        value={email}
                        placeholder="Email" 
                        style={style.signupbox}
                        onChange={this.handleChange}
                        />
                    </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                         <input 
                         type="password" 
                         value={password}
                         className="form-control" 
                         name="password"
                         placeholder="Password" 
                         style={style.signupbox}
                         onChange={this.handleChange}
                         />
                        </div>
                    </div> 
                    <div className="form-group row">
                        <div className="col-sm-10">
                         <input type="text" 
                         className="form-control" 
                         value={username}
                         name="username"
                         placeholder="Username" 
                         style={style.signupbox}
                         onChange={this.handleChange}
                         />
                        </div>
                    </div> 
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <img 
                               src={ this.state.profileImageUrl ||`https://img.icons8.com/bubbles/2x/user.png` } 
                               alt="pic" 
                               width="64" 
                               height="64" 
                               className="mr-1 rounded-circle"
                               />
                            <input 
                                type="file"
                                name="profilePhoto"
                                placeholder="Profile image url" 
                                className="mt-0"
                                onChange={this.handleChange2}
                                encType="multipart/form-data"
                                accept=".png,.jpg,.gif" 
                            />
                        </div>
                    </div> 
                    </div>
                    )
                    

                    }
                    <p>
                        <button className="btn btn-md btn-primary mr-2" type="submit">Submit</button>
                        {this.props.heading === "Signin" ?  <Link to="/signup" className="btn btn-md btn-primary">Signup</Link> : null }
                    </p>
                </form>
            </div>
        ) 

    }
}
export default UserAuthForm