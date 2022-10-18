import React, { Component, useState } from 'react'
import NoteGrid from './NoteGrid'
import NoteInput from './NoteInput'

const NotesArea = ({ notes }) => {
    return (
        <div className='note-area'>
            <div className='container'>
                <NoteInput />
                <NoteGrid notes={ notes } />
            </div>
        </div>
    )
}

export default NotesArea;
