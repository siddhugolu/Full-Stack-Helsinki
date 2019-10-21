import React from 'react';
import Part from './Part';

const Content = ({parts}) => {

	const show = () => parts.map(part => 
		<Part key={part.id} name={part.name} exercises={part.exercises} />
	)

	const total = () => parts.reduce((sum, part) => sum + part.exercises, 0)
	return (
		<div>
		  {show()}
		  Total of {total()} exercises
		</div>
	)
}

export default Content