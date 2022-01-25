import React, {  useState } from 'react'
import Form from '../components/Form'
import Logo from '../components/Logo'
import axios from 'axios'
import REGISTER_URI from '../components/REGISTER_URI'
import hero from "../img/undraw_uploading_re_okvh.svg"

const Register = () => {
    const [ user, setUser] = useState({
        name: '',
        email:'',
        password:''
    })

    const handleChange = e => {
        const newUser ={...user}
        newUser[e.target.id] = e.target.value
        setUser(newUser)
        console.log(newUser);
    }

    const register = (event) => {
        event.preventDefault()

        const { name, email, password } = user
        if( name && email && password ){
            axios.post(REGISTER_URI, user)
            .then( res => {
                if(res.status === 200){
                    window.location.assign('/');
                }
            })
        } else {
            alert("invlid input")
        }
        
    }

    return(
        <main>
            <Logo />
            <div>
                <div className="register">
                    <div className="register__img">
                        <img src={hero} alt=""/>
                    </div>
                    <div className="register__text">
                        <div className="register__info">
                            <Form 
                                type='register'
                                name={ user.name }
                                email={ user.email }
                                password={ user.password }
                                handleChange={handleChange}
                                authorization={ register }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}


export default Register;