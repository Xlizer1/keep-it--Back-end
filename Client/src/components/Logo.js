
import React, { Component } from 'react'
import logo from "../img/Keep it.svg"

export default class Logo extends Component {
    render() {
        return (
            <a href='/'>
                <div className="logo">
                    <img src={logo}  alt="logo"/>
                </div>
            </a>
        )
    }
}
