import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class FormMessage extends Component {
    render(props) {
        return (
            <div>
                {this.props.type==="register" ?
                (<span className="form-msg"> Have an account<Link to='/'> Login</Link></span>):
                (<span className="form-msg"> Don't have an account?<Link to='/register'> Sign up</Link></span>)
                }
            </div>
            
        )
    }
}

