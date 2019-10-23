import React from 'react'

const PersonForm = ({addNameNumber, newName, handleNewPerson, newNumber, handleNewNumber}) => {
	return (
		<div>
		  <form onSubmit={addNameNumber}>
		  <div>
		    Name: <input value={newName} onChange={handleNewPerson} />
		  </div>
		  <div>
		    Phone-Number: <input value={newNumber} onChange={handleNewNumber} />
		  </div>
		  <div>
		    <button type='submit' > Add </button>
		  </div>
		  </form>
		</div>
	)
}

export default PersonForm