import axios from 'axios'
import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import numberService from './services/numbers'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)


  useEffect(() => {
    numberService
      .getAll()
      .then(initialNumber => {
        setPersons(initialNumber)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const deletePerson = (id) => {
    if (window.confirm(`Do you really want to delete ${persons.map(p => (p.id === id) ? p.name : null)}?`)) {
      let deleted = true;

      numberService
        .remove(id)
        .catch((err) => {
          deleted = false
        })
        .then(() => {
          if (deleted) {
            setPersons(persons.filter(p => p.id !== id))
          }
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(item => item.name).includes(newName)) {
      const person = persons.find(p => p.name == newName)
      updateNumber(person)
    } else {
      const personObj = {
        name: newName,
        number: newNumber,
      }

      numberService
        .create(personObj)
        .then(returnedObj => {
          setPersons(persons.concat(returnedObj))
          setNewName('')
          setNewNumber('')
          setMessage(
            `${returnedObj.name} was succesfully added.`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setError(`Error, ${error.response.data.error}`)
          setTimeout(() => {
            setError(null)
          }, 5000)
        })
    }
  }

  const updateNumber = (person) => {
    if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) {
      const personObj = {
        ...person,
        number: newNumber
      }

      numberService
        .update(person.id, personObj)
        .then(returnedObj => {
          setPersons(persons.map(p => (p.id !== returnedObj.id) ? p : returnedObj))
          setNewName('')
          setNewNumber('')
          setMessage(
            `Phone number from ${returnedObj.name} was succesfully updated.`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      .catch(error => {
        setError(`Error, ${error.response.data.error}`)
        setTimeout(() => {
          setError(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== personObj.id))
      })
    }
  }


  return (
    <div>
      <h2>Numberbook</h2>
      <Notification message={message} className={'message'}/>
      <Notification message={error} className={'error'} />
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
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App