import React from 'react';

const Header = ({name}) => {
	return (
		<div>
		  <h2> {name} </h2>
		</div>
	)
}

const Part = ({name, exercises}) => {
	return (
		<div>
		  <p> {name} {exercises} </p>
		</div>
	)
}


const Content = ({parts}) => {

	const show = () => parts.map(part => 
		<Part key={part.id} name={part.name} exercises={part.exercises} />
	)

	const total = () => parts.reduce((sum, part) => sum + part.exercises, 0)

	return (
		<div>
		  {show()}
		  <h3> Total of {total()} exercises </h3>
		</div>
	)
}

const Course = ({course}) => {

	return (
		<div>
		  <Header name={course.name} />
		  <Content parts={course.parts} />
		</div>
	)
}

export default Course