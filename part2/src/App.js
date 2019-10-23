import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', phone: '88800-88800' },
		{ name: 'Ada Lovelace', phone: '12343-45385' },
		{ name: 'Dan Abramov', phone: '849929-288399' },
		{ name: 'Siddhartha', phone: '88482110930' },
		{ name: 'Prashant', phone: '883990103' }
	])

	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newSearch, setNewSearch] = useState('')

	const addNameNumber = (event) => {
		event.preventDefault()
		
		const checkName = newName
		const pos = persons.findIndex(p => p.name === newName)
		console.log(pos)
		if(pos === -1) {
			const newObject = {
				name: newName,
				phone: newNumber
			}
			setPersons(persons.concat(newObject))
			setNewName('')
			setNewNumber('')
		}
		else {
			window.alert(`${checkName} is already added to Phonebook`)
		}

	}

	const handleNewPerson =(event) => {
		// console.log(event.target.value)
		setNewName(event.target.value)

	}

	const handleNewNumber = (event) => {
		setNewNumber(event.target.value)
	}

	const handleNewSearch = (event) => {
		setNewSearch(event.target.value)
	}


	return (
		<div>
		  <h2> Phonebook </h2>
		  <Filter newSearch={newSearch} handleNewSearch={handleNewSearch} />
		  <h3> Add to Phonebook </h3>
		  <PersonForm addNameNumber={addNameNumber} 
		  	newName={newName} handleNewPerson={handleNewPerson}
		  	newNumber={newNumber} handleNewNumber={handleNewNumber} />
		  
		  <h2> Numbers </h2>
		  <Persons persons={persons} newSearch={newSearch} />
		</div>
	)

}

export default App