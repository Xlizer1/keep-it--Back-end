import React, { Component } from 'react'
import Note from './Note'

export default class NoteGrid extends Component {
    render(props) {
        const updateDelete=(noteToDeleteId)=> {
            this.props.updateDelete(noteToDeleteId)
        }
        return (
            <div className='note-grid'>
                {this.props.notes?this.props.notes.map((note,index)=>{
                    return <Note key={index} id={index} title={note.title} content={note.content} img={note.image} updateDelete={updateDelete}/>
                }):null}
            </div>
        )
    }
}
