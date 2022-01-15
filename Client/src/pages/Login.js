import React, { useState } from 'react'
import RegisterGrid from '../components/RegisterGrid'
import Logo from '../components/Logo'
import Form from '../components/Form'
import hero from "../img/undraw_uploading_re_okvh.svg"
import Login_URI from '../components/Login_URI'
import axios from 'axios'

const Login = () => {
    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const newUser ={...user}
        newUser[e.target.id] = e.target.value
        setUser(newUser)
        console.log(newUser);
    }

    const login = () => {
        axios.post(Login_URI, user)
        .then( res => {
            if(res.status === 200){
                window.location.assign('/user');
            }
        })
    }
    return (
        <main>
            <Logo/>
            <div>
                <div className="register">
                    <div className="register__img">
                        <img src={hero} alt=""/>
                    </div>
                    <div className="register__text">
                        <div className="register__info">
                            <Form type='login'
                                handleChange={ handleChange }
                                authorization={ login }/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default  Login;