import React, { Component } from 'react'

export default class Note extends Component {
    
    render(props) {
        const handleDelete = ()=> {
            this.props.updateDelete(this.props.id)
        }
        return (
            <div className='note'>
                <img src={URL.createObjectURL(this.props.img)} alt="note_img" className='note__img'/>
                <div className='note__text'>
                    <h3>{this.props.title}</h3>
                    <p>{this.props.content}</p>
                </div>
                <div className="note__delete" onClick={handleDelete}><i className="far fa-trash-alt"></i></div>
            </div>
        )
    }
}
