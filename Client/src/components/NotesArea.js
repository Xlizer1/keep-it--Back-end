import React, { Component } from 'react'
import NoteGrid from './NoteGrid'
import NoteInput from './NoteInput'

export default class NotesArea extends Component {
    render(props) {
    // Update Notes : Add new Note
    const updateUser=(newNote)=> {
        this.props.updateUserParent(newNote)
    }
    // Update Notes : Delete Note
    const updateDelete=(noteToDeleteId)=> {
        this.props.deleteUpdate(noteToDeleteId)
    }
        return (
            <div className='note-area'>
                <div className='container'>
                    <NoteInput updateParent={updateUser}/>
                    <NoteGrid notes = {this.props.notes} updateDelete={updateDelete}/>
                </div>
            </div>
        )
    }
}
