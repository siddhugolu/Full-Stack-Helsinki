import React, {useState, useEffect} from 'react'
import noteService from './services/notes'
import Note from './components/Note'

const App = () => {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('')
	const [showAll, setShowAll] = useState(true)

	useEffect(() => {
		noteService.getAll()
					.then(initialNotes => {
						setNotes(initialNotes)
					})
	}, [])

	const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

	const toggleImportanceOf = id => {
		
		const note = notes.find(n => n.id === id)
		const changedNote = { ...note, important: !note.important}

		noteService.update(id, changedNote)
					.then(returedNote => {
						setNotes(notes.map(n => n.id !== id ? n : returedNote))
					})
					.catch(error => {
						alert(`the note '${note.content}' was already deleted from the server`)
						setNotes(notes.filter(n => n.id !== id))
					})
	}

	const rows = () => notesToShow.map(note => 
		<Note key={note.id} note={note} 
				toggleImportance={() => toggleImportanceOf(note.id)}
		/>
	)

	const addNote = (event) => {
		event.preventDefault()
		const noteObject = {
			content: newNote,
			date: new Date(),
			important: Math.random() > 0.5
		}

		noteService.create(noteObject)
					.then(returnedNote => {
						setNotes(notes.concat(returnedNote))
						setNewNote('')
					})
	}

	const handleNoteChange = (event) => {
		setNewNote(event.target.value)
	}

	return (
		<div>
			<h1> Notes </h1>
		  <div>
			  <button onClick={() => setShowAll(!showAll)}>
			    show {showAll ? 'important' : 'all'}
			  </button>
		  </div>
		  <ul>
		    {rows()}
		  </ul>
		  <form onSubmit={addNote}>
		    <input value={newNote} onChange={handleNoteChange}/>
		    <button type='submit'> Save </button>
		  </form>
		</div>
	)
}

export default App