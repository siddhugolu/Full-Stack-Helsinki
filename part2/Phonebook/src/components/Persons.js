import React from 'react';

const Persons = ({ persons, newSearch, deleteEntry }) => {
	const filterPersons = persons.filter(p => p.name.toLowerCase().includes(newSearch.toLowerCase()))


	const showPersons = () => filterPersons.map(p => 
		<div key={p.name}>
		  {p.name} {p.number}
		  <button onClick={deleteEntry}> Delete </button>
		</div>
	)

	return (
		<div>
		  {showPersons()}
		</div>
	)
}

export default Persons