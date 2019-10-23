import React, { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas',
		  id: 1
		}
	])
	const [newName, setNewName] = useState('')

	const addName = (event) => {
		event.preventDefault()
		
		const checkName = newName
		const pos = persons.findIndex(p => p.name === newName)
		console.log(pos)
		if(pos === -1) {
			const newObject = {
				name: newName,
				id: persons.length + 1
			}
			setPersons(persons.concat(newObject))
			setNewName('')
		}
		else {
			window.alert(`${checkName} is already added to Phonebook`)
		}

	}

	const handleNewPerson =(event) => {
		// console.log(event.target.value)
		setNewName(event.target.value)

	}

	const showPersons = () => persons.map(p => 
		<div key={p.id}>
		  {p.name}
		</div>
	)

	return (
		<div>
		  <h2> Phonebook </h2>
		  <form onSubmit={addName}>
		    <div>
		      Name: <input value={newName} onChange={handleNewPerson}/>
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