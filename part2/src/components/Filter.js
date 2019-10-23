import React from 'react'

const Filter = ({newSearch, handleNewSearch}) => {
	return (
		<div>
		  Filter the names containing: <input value={newSearch} onChange={handleNewSearch} />
		</div>
	)
}

export default Filter