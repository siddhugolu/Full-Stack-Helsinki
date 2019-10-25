import React from 'react'

const Filter = ({newSearch, handleNewSearch}) => {
	return (
		<div>
		  Find countries: <input value={newSearch} onChange={handleNewSearch} />
		</div>
	)
}

export default Filter