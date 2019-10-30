import React, {useState, useEffect} from 'react'
import PersonForm from './components/PersonForm'
import Entry from './components/Entry'
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
				.catch(() => console.log('Rejected during getAll'))
	}, [])

	const addNameNumber = (event) => {
		event.preventDefault()

		const pos = persons.findIndex(p => p.name === newName)
		if(pos === -1) {
			const newObject = {
				name: newName,
				phone: newNumber
			}
			phoneService.create(newObject)
						.then(newPerson => {
							setPersons(persons.concat(newPerson))
							setNewName('')
							setNewNumber('')
						})
						.catch(() => console.log('Rejected during create'))
		}
		else {
			if(window.confirm(`${newName} is already added to Phonebook. Replace the old number with a new one?`)) {
				const person = persons.find(p => p.name === newName)
				const changedPerson = {...person, phone: newNumber}
				const newId = person.id
				phoneService.update(newId, changedPerson)
							.then(returned => {
								setPersons(persons.map(p => 
									p.id === newId ? returned : p))
								setNewName('')
								setNewNumber('')
							})
							.catch(() => console.log('Rejected during udpate'))
			}
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
				console.log(`Delete request issued`)
				setPersons(persons.filter(p => p.id !== id))
			})
		}
		
	}

	const filterPersons = persons.filter(p => p.name.toLowerCase().includes(newSearch.toLowerCase()))

	const showEntry = () => filterPersons.map(p => 
			<Entry key={p.id}
				person={p}
				deleteEntry={() => deleteEntryOf(p.id)}
			/>
		)

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
			{showEntry()}
			
		</div>
	)
}

export default App