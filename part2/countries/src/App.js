import axios from 'axios'
import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter 
        newFilter={filter}
        handleFilterChange={handleFilterChange}
      />
      <Countries countries={countries} filter={filter} />
      
    </div>

  )
}

export default App;
