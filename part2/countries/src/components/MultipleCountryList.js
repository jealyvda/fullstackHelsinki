import CountriesRow from "./CountriesRow"

const MultipleCountryList = ({ countries }) => (
    <table>
        <tbody>
            {countries.map(item => <CountriesRow key={item.name.common} country={item}/>)}
        </tbody>
    </table>
)

export default MultipleCountryList