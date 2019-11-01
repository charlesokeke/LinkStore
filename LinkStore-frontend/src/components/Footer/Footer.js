import React from 'react'
import {Link} from 'react-router-dom'
const style ={
    position:"fixed",
    bottom:'0',
    width:'100%',
    boxShadow: " 0 2px 3px #ccc",
    backgroundColor:'#eee',
    padding:'5px'
}
const Footer = (props) => {
    return (
        <footer style={style}>
            <div className="container-fluid ">
                <div style={{display:'flex', justifyContent:"center", alignItems:"center", padding:"10px"}}>
                    <p className="p-0 m-0 font-weight-normal">Chukwuemeka Okeke &copy;Copyright 2019</p>
                </div>
                
            </div>
        </footer>

    )

}
export default Footer