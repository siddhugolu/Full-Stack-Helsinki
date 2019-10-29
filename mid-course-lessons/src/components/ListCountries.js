import React, {useState} from 'react'
import ShowCountryDetails from './ShowCountryDetails'

const ListCountries = ({filterCountry}) => {

    // const [showAll, setShowAll] = useState([false])    

    console.log(filterCountry)
    const result = () => filterCountry.map(f => 
        <div key={f.numericCode}>
                {f.name}
                {/* {console.log(f)} */}
                
                {/* <button onClick={() => setShowAll()}> Show Details </button>    */}
        </div>
    )

    return (
        <div>
            {result()}
        </div>
    )
}

export default ListCountries