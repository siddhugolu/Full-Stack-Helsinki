import React, {useState, useEffect} from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneService from './services/phonebook'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newSearch, setNewSearch] = useState('')

	useEffect(() => {
		phoneService.getAll()
				.then(directory => {
					setPersons(directory)
				})
	}, [])

	const addNameNumber = (event) => {
		event.preventDefault()

		const pos = persons.findIndex(p => p.name === newName)
		if(pos === -1) {
			const newObject = {
				name: newName,
				number: newNumber
			}
			phoneService.create(newObject)
						.then(newPerson => {
							setPersons(persons.concat(newPerson))
							setNewName('')
							setNewNumber('')
						})
		}
		else {
			alert(`${newName} is already added to Phonebook`)
		}

	}

	const handleNewPerson = (event) => {
		setNewName(event.target.value)
	}

	const handleNewNumber = (event) => {
		setNewNumber(event.target.value)
	}

	const handleNewSearch = (event) => {
		setNewSearch(event.target.value)
	}

	const deleteEntryOf = id => {
		const entry = persons.find(f => f.id === id)
		if(window.confirm(`Delete ${entry.name}?`)) {
			phoneService.deleteOne(id)
			.then(returned => {
				console.log("Delete request issued")
				setPersons(persons)
			})
		}
		
	}

	return (
		<div>
			<h1> Working with Phonebook </h1>
			<div>
				Filter shown with: <input value={newSearch} onChange={handleNewSearch} />
			</div>
			<h2>Add to Phonebook </h2> 

			<PersonForm addNameNumber={addNameNumber}
						newName={newName}
						handleNewPerson={handleNewPerson}
						newNumber={newNumber}
						handleNewNumber={handleNewNumber} />

			<h3>Numbers </h3> 
			<Persons persons={persons} newSearch={newSearch} deleteEntry={() => deleteEntryOf()} />
			
		</div>
	)
}

export default App