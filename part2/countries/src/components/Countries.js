import SingleCountryStats from "./SingleCountryStats"
import MultipleCountryList from "./MultipleCountryList"

const Countries = ({ countries, filter }) => {

    const countriesList = countries.filter(item => (item.name.common.toUpperCase().includes(filter.toUpperCase())) ? item : null)

    if (countriesList.length == 0) {
        return (<p>There are no countries matching this criteria</p>)
    } else if (countriesList.length == 1) {
        return <SingleCountryStats country={countriesList[0]} />
    } else if (countriesList.length > 10) {
        return (<p> Too many matches, specify another filter</p>)
    } else {
        return <MultipleCountryList countries={countriesList}/>
}
}

export default Countries