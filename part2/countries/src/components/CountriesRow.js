import SingleCountryStats from "./SingleCountryStats"

import { useState } from "react"
const CountriesRow = ({ country }) => {
    
    const [isShown, setIsShown] = useState(false)
    const handleClick = (event) => {
        setIsShown(isShown => !isShown)
    }

    return (
        <>
        <tr>
            <td>               
                {country.name.common}
            </td>
            <td>
                <button onClick={handleClick}>
                    {(isShown) ? 'hide' : 'show'}
                </button>
            </td>
        </tr>
        {isShown && (<tr>
            <td>
            <SingleCountryStats country={country} />
            </td>
            </tr>
        )}
        </>
)}

export default CountriesRow