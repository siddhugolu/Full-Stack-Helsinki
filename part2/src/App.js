import React, { useState } from 'react'

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

	const filterPersons = persons.filter(p => p.name.toLowerCase().includes(newSearch))

	const showPersons = () => filterPersons.map(p => 
		<div key={p.name}>
		  {p.name} {p.phone}
		</div>
	)


	return (
		<div>
		  <h2> Phonebook </h2>
		  <div>
		    Filter the names containing: <input value={newSearch} onChange={handleNewSearch} />
		  </div>

		  <h3> Add to Phonebook </h3>
		  <form onSubmit={addNameNumber}>
		    <div>
		      Name: <input value={newName} onChange={handleNewPerson}/>
		    </div>
		    <div>
		      Phone-Number: <input value={newNumber} onChange={handleNewNumber} />
		    </div>
		    <div>
		      <button type="submit" > Add </button>
		    </div>
		  </form>
		  <h2> Numbers </h2>
		  {showPersons()}
		</div>
	)

}

export default App