import React from 'react';

const Persons = ({ persons, newSearch, }) => {
	const filterPersons = persons.filter(p => p.name.toLowerCase().includes(newSearch.toLowerCase()))

	const showPersons = () => filterPersons.map(p => 
		<div key={p.name}>
		  {p.name} {p.phone}
		</div>
	)

	return (
		<div>
		  {showPersons()}
		</div>
	)
}

export default Persons