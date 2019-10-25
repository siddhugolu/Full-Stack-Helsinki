import React from 'react'

const ShowCountryDetails = ({filterCountry}) => {

    const showCountry = () => filterCountry.map(c => 
		<div key={c.numericCode}>
			<h1> {c.name} </h1>
			<div> Capital: {c.capital} </div>
			<div> Population: {c.population} </div>
			<h2> Languages </h2>
			{c.languages.map(lan =>
				<div key={lan.name}>
					<ul>
						<li>
							{lan.name}
						</li>
					</ul>
				</div>
			)}

			<img src={c.flag} alt="flag" height="56" width="56" />
		</div>
    )
    
    return (
        <div>
            {showCountry()}
        </div>
    )
}

export default ShowCountryDetails