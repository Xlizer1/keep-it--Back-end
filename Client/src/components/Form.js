import React, { Component } from 'react'
import FormMessage from './FormMessage'
import Button from './Button'

export default class Form extends Component {
    render(props) {
        return (
            <>
                <h3>{this.props.type==="register"? "Hello!" : "Hello again!"}</h3>

                <span className="register__msg">{this.props.type==="register"? "Sign Up To Get Started" : "Welcome back"}</span>

                <form action="" className="register__form">

                    <div className="form-input" style={this.props.type==="register"?{display:"block"}:{display:"none"}}>
                        <span className="input-icon"><i className="fas fa-user"></i></span>
                        <input type="text" name="name" id="name" placeholder="Name" value={ this.props.name } onChange={ this.props.handleChange }/>
                    </div>
                    <div className="form-input">
                        <span className="input-icon"><i className="far fa-envelope"></i></span>
                        <input type="text" name="email" id="email" placeholder="Email addresse" value={ this.props.email } onChange={ this.props.handleChange }/>    
                    </div>
                    <div className="form-input">
                        <span className="input-icon"><i className="fas fa-lock"></i></span>
                        <input type="password" name="password" id="password" placeholder="Password" value={ this.props.password } onChange={ this.props.handleChange }/>
                    </div>

                    <Button type={this.props.type} authorization={ this.props.authorization }/>

                </form>

                <FormMessage type={this.props.type}/>
            </>
        )
    }
}
