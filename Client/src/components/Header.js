import React, { Component } from 'react'
import Logo from './Logo'
import UserAvatar from './UserAvatar'

export default class Header extends Component {
    render() {
        return (
            <header>
                <nav className='container'>
                    <Logo/>
                    <UserAvatar/>
                </nav>
            </header>
        )
    }
}

