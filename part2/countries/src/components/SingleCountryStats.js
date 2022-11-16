import Weather from "./Weather"

const SingleCountryStats = ({ country }) => {

    return(
        <>
            <h1>
                {country.name.common}
            </h1>
            <div>
                <p>
                    capital {country.capital}
                    <br />
                    area {country.area}
                    <br /> <br />
                    <b>languages:</b>
                    </p>
                    <ul>
                        {Object.values(country.languages).map(item => <li key={item}>{item}</li>)}
                    </ul>
                <img src={country.flags.png} />
            </div>
            <Weather country={country} />
        </>
    )
}

export default SingleCountryStats