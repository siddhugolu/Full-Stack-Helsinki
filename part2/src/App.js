import React, {useState, useEffect} from 'react'
import axios from 'axios'


const App = () => {
	// const [notes, setNotes] = useState([])
	// const [newNote, setNewNote] = useState('')
	// const [showAll, setShowAll] = useState(true)

	// const [persons, setPersons] = useState([])

	const [countries, setCountries] = useState([])

	// const renderLanguage = () => countries.languages.map(c => 
	// 	<div>
	// 		<ul>
	// 			<li key={c.name}>
	// 				{c.name}
	// 			</li>
	// 		</ul>
	// 	</div>

	// )

	const showCountries = () => countries.map(c => 
		<div key={c.numericCode}>
			<h1> {c.name} </h1>
			<div> Capital: {c.capital} </div>
			<div> Population: {c.population} </div>
			<h2> Languages </h2>
			<p>
				{c.languages.name}
			</p>
			
		</div>
	)

	useEffect(() => {
		console.log('effect')
		axios.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				console.log('promise fulfilled')
				setCountries(response.data)
			})
	}, [])
	console.log('render', countries.length, 'countries')
	console.log({countries})


	return (
		<div>
			<h1> Working with Countries </h1>
			{showCountries()}
		</div>
	)
}

export default App