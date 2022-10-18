import axios from 'axios'
import React, { useState } from 'react'
import Header from '../components/Header'
import NotesArea from '../components/NotesArea'
import LIST_URI from '../components/LIST_URI'

const Home = ({ notes }) => {
    return (
        <div className='user'>
            <Header/>
            <NotesArea notes={ notes }/>
        </div>
    )
}

export default Home;