import React, { useState } from 'react'
import axios from 'axios';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import POST_URI from './POST_URI';
import app from './firebase'

const NoteInput = ()=> {
    const [note, setNote]= useState ({
        title:"",
        desc:""
    })

    const [ file, setFile ] = useState(null);

    const handleChange = (e) => {
        e.preventDefault();
        const newPost = { ...note };
        newPost[e.target.name] = e.target.value;
        setNote(newPost)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
                default:
            }
        }, 
        (error) => {
            console.log(error)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const data = {
                title: note.title,
                desc: note.desc,
                image: downloadURL
            };

            const config = {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
            
            axios.post( POST_URI, data, config ).then((res) => {
                if(res.data === "added"){
                    window.location.assign('/');
                } else {
                    alert('note added');
                }
            })
            });
        }
        );
    };

    return (
        <div className='note-inputs'>
            <form>
                <input type="text" name="title" value={ note.title } id="title" placeholder="Title" onChange={ handleChange }/>
                <input name = "desc" value={ note.desc } id="note-content" placeholder='Your note' onChange={handleChange}></input>
            </form>
            <div className='note-actions'>
                <input id='fileUpload' type="file" multiple accept="image/*" name="image" onChange={ (e)=> setFile(e.target.files[0]) } hidden/>
                <label for="fileUpload"><i className="far fa-image"/></label>
                <button className='add-icon' onClick={ handleSubmit }><p className='plus'>+</p></button>
            </div>
        </div>
    )
}

export default NoteInput;
