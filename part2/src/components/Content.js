import React from 'react';
import Part from './Part';

const Content = ({parts}) => {

	const show = () => parts.map(part => 
		<Part key={part.id} name={part.name} exercises={part.exercises} />
	)
	return (
		<div>
		  {show()}
		</div>
	)
}

export default Content