import React, {useState, useEffect} from 'react'
import axios from 'axios'


const App = () => {
	// const [notes, setNotes] = useState([])
	// const [newNote, setNewNote] = useState('')
	// const [showAll, setShowAll] = useState(true)

	const [persons, setPersons] = useState([])

	useEffect(() => {
		console.log('effect')
		axios.get('http://localhost:3001/persons')
			.then(response => {
				console.log('promise fulfilled')
				setPersons(response.data)
			})
	}, [])
	console.log('render', persons.length, 'persons')

	const showPhone = () => persons.map(p => 
		<div key={p.id}>
			{p.name} {p.number}
		</div>
	)

	return (
		<div>
			<h1> Working with Phonebook </h1>
			{showPhone()}
		</div>
	)
}

export default App