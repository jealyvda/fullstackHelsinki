import Input from './Input'

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

  export default PersonForm