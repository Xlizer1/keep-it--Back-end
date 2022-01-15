import React, { Component } from 'react'
import Form from './Form'
import hero from "../img/undraw_uploading_re_okvh.svg"

export default class RegisterGrid extends Component {
    render() {
        return (
            <div>
                <div className="register">
                    <div className="register__img">
                        <img src={hero} alt=""/>
                    </div>
                    <div className="register__text">
                        <div className="register__info">
                            <Form type={this.props.type} 
                                handleChange={ this.props.handleChange }
                                login={ this.props.login }/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
