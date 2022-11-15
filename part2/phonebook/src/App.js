import { useState } from 'react'

const Filter = ({ newFilter, handleFilterChange }) => (
  <div>
    filter shown with: 
    <input
      value={newFilter}
      onChange={handleFilterChange}
    />
  </div>
)

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => (
  <>
    <h2>Add a new</h2>
    <form onSubmit={addPerson}>
      <Input text='name' value={newName} onChange={handleNameChange}/>
      <Input text='number' value={newNumber} onChange={handleNumberChange} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
)

const Input = ({ text, value, onChange }) => (
  <div>
  {text}:
  <input
    value={value}
    onChange={onChange}
  />
  </div>
)
const Numbers = ({ persons, newFilter }) => (
  <>
    <h2>Numbers</h2>
    <table>
      <tbody>
      {persons
        .filter(item => (item.name.toUpperCase().includes(newFilter.toUpperCase())) ? item : null)
        .map(item => <NumberRow key={item.id} name={item.name} number={item.number} />  
      )}
      </tbody>
    </table>
  </>
)

const NumberRow = ({ name, number }) => (
  <tr>
    <td>{name}</td>
    <td>{number}</td>
  </tr>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(item => item.name).includes(newName)) {
      return window.alert(`${newName} is already added to Numberbook`)
    } else {
      const personObj = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      setPersons(persons.concat(personObj))
      setNewName('')
      setNewNumber('')
    }
  }


  return (
    <div>
      <h2>Numberbook</h2>
      <Filter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Numbers
        persons={persons}
        newFilter={newFilter}
      />
    </div>
  )
}

export default App