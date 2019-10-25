import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import TooManyMatches from './components/TooManyMatches'
import ListCountries from './components/ListCountries'
import ShowCountryDetails from './components/ShowCountryDetails'


const App = () => {

	const [newSearch, setNewSearch] = useState('')
	const [countries, setCountries] = useState([])
	

	useEffect(() => {
		// console.log('effect')
		axios.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				console.log('promise fulfilled')
				setCountries(response.data)
			})
	}, [])
	console.log('render', countries.length, 'countries')
	// console.log({countries})

	const handleNewSearch = (event) => {
		setNewSearch(event.target.value)
	}

	const filterCountry = countries.filter(f =>
		f.name.toLowerCase().includes(newSearch.toLowerCase())	
	)

	let result;
	if(filterCountry.length > 10) {
		result = <TooManyMatches />
	}

	else if(filterCountry.length < 10 && filterCountry.length > 1) {
		result = <ListCountries filterCountry={filterCountry} />
	}

	else {
		result = <ShowCountryDetails filterCountry={filterCountry} />
	}


	return (
		<div>
			<Filter newSearch={newSearch} handleNewSearch={handleNewSearch} />
			{result}
		</div>
	)
}

export default App