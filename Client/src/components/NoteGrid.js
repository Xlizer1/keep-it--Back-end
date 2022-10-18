import Note from './Note'

 const NoteGrid = ({ notes }) => {
    return (
        <div className='note-grid'>
            {notes.map((note)=>{
                return <Note 
                    id={note._id}
                    title={note.title}
                    desc={note.desc} 
                    img={note.image}
                />
            })}
        </div>
    )
}

export default NoteGrid;
