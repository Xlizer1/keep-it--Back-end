import axios from 'axios'
import React from 'react'

 const Note = ({ id, desc, title, img}) => {
    const handelDelete = async() =>{
        const config = {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }

        await axios.delete(`http://localhost:4000/post/delete/${id}`, config).then((res) => {
          if(res.status === 200){
            window.location.reload();
          } else {
            console.log(res);
          }
        })
    }

    return (
        <div className='note' key={id}>
            <img src={img} alt="note_img" className='note__img'/>
            <div className='note__text'>
                <h3>{title}</h3>
                <p>{desc}</p>
            </div>
            <div className="note__delete" onClick={handelDelete}><i className="far fa-trash-alt"></i></div>
        </div>
    )
}

export default Note;