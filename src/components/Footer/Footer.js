import React from 'react'
import {Link} from 'react-router-dom'
const style ={
    position:"fixed",
    bottom:'0',
    width:'100%',
    boxShadow: "-2px 1px 5px 0px rgba(0,0,0,0.75)",
    backgroundColor:'#fff',
    padding:'5px'
}
const Footer = (props) => {
    return (
        <footer style={style}>
            <div className="container-fluid ">
                <div className=" d-flex">
                    <div className="d-flex flex-direction-start " style={{flex:'3'}}>
                        <ul style={{margin:'0px',padding:'0px',listStyle:'none'}}>
                            <li style={{display:'inline',padding:'5px'}}><Link to='/' className="btn btn-primary btn-md">LinkStore</Link></li>
                            <li style={{display:'inline',padding:'5px'}}> &copy;Copyright 2019</li>
                        </ul>
                    </div>
                    <div className="d-flex justify-content-end " style={{flex:'1'}}>
                    <ul style={{margin:'0px',padding:'0px',listStyle:'none'}}>
                            <li style={{display:'inline-block',padding:'5px'}}> services</li>
                        </ul>

                    </div>
                </div>
                
            </div>
        </footer>

    )

}
export default Footer