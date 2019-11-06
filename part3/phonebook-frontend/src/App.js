import React, {useState, useEffect} from 'react'
import PersonForm from './components/PersonForm'
import Entry from './components/Entry'
import phoneService from './services/phonebook'
import Notification from './components/Notification'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newSearch, setNewSearch] = useState('')
	const [message, setMessage] = useState(null)
	const [isError, setIsError] = useState(false)

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
				number: newNumber
			}
			phoneService.create(newObject)
						.then(newPerson => {
							setPersons(persons.concat(newPerson))
							setNewName('')
							setNewNumber('')
							setIsError(false)
							setMessage(`Added ${newName}`)
							setTimeout(() => {
								setMessage(null)
							}, 3000)
						})
						.catch(() => console.log('Rejected during create'))
		}
		else {
			// if(window.confirm(`${newName} is already added to Phonebook. Replace the old number with a new one?`)) {
			// 	const person = persons.find(p => p.name === newName)
			// 	const changedPerson = {...person, phone: newNumber}
			// 	const newId = person.id
			// 	phoneService.update(newId, changedPerson)
			// 				.then(returned => {
			// 					setPersons(persons.map(p => 
			// 						p.id === newId ? returned : p))
			// 					setNewName('')
			// 					setNewNumber('')
			// 					setIsError(false)
			// 					setMessage(`Updated ${person.name}`)
			// 					setTimeout(() => {
			// 						setMessage(null)
			// 					}, 3000)
			// 				})
			// 				.catch(() => {
			// 					console.log('Rejected during udpate')
			// 					setIsError(true)
			// 					setMessage(
			// 						`Information of ${person.name} has already been removed from server`
			// 					)
			// 					setTimeout(() => {
			// 						setMessage(null)
			// 					}, 3000)
			// 				})
			// }
			setIsError(true)
			setMessage(`${newName} is already added to Phonebook`)
			setTimeout(() => {
				setMessage(null)
			}, 3000)
			setNewName('')
			setNewNumber('')
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
				setIsError(true)
				setMessage(`${entry.name} deleted`)
				setTimeout(() => {
					setMessage(null)
				}, 3000)
			})
			.catch(() => {
				console.log('Rejected during delete')
				setIsError(true)
				setMessage(`Information of ${entry.name} has already been deleted from server`)
				setTimeout(() => {
					setMessage(null)
				}, 3000)
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

			<Notification message={message} isFailure={isError}/>

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