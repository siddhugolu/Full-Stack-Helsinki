import React, {useState, useEffect} from 'react'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'

import loginService from './services/login'
import noteService from './services/notes'

const App = () => {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('')
	const [showAll, setShowAll] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	// const [loginVisible, setLoginVisible] = useState(false)

	useEffect(() => {
		noteService.getAll()
					.then(initialNotes => {
						setNotes(initialNotes)
					})
	}, [])

	useEffect(()  => {
		const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
		if(loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			noteService.setToken(user.token)
		}
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
						setErrorMessage(
							`Note '${note.content}' was already removed from the server`
						)
						setTimeout(() => {
							setErrorMessage(null)
						}, 5000)
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
		noteFormRef.current.toggleVisibility()
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

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password
			})

			window.localStorage.setItem(
				'loggedNoteappUser', JSON.stringify(user)
			)
			noteService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
		
	}

	const loginForm = () => (
		<Togglable buttonLabel="login">
			<LoginForm
			  username={username}
			  password={password}
			  handleUsernameChange={({target}) => setUsername(target.value)}
			  handlePasswordChange={({target}) => setPassword(target.value)}
			  handleSubmit={handleLogin}
			/>
		</Togglable>
	)

	const noteFormRef = React.createRef()

	const noteForm = () => (
		<Togglable buttonLabel="new note" ref={noteFormRef}>
			<NoteForm
			  onSubmit={addNote}
			  value={newNote}
			  handleChange={handleNoteChange}
			/>
		</Togglable>
	)

	const logout = () => {
		window.localStorage.removeItem('loggedNoteappUser')
		setUser(null)
	}

	return (
		<div>
			<h1> Notes </h1>

			<Notification message={errorMessage} />

			
			{user === null ?
				loginForm() : 
				<div>
					{user.name} logged in
					<button onClick={logout}>
					  logout
					</button>
					{noteForm()}
				</div>
			}
			<h2> Notes </h2>

		  <div>
			  <button onClick={() => setShowAll(!showAll)}>
			    show {showAll ? 'important' : 'all'}
			  </button>
		  </div>
		  <ul>
		    {rows()}
		  </ul>

		  <Footer />
		</div>
	)
}

export default App