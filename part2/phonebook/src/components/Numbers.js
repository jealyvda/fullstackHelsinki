import NumberRow from "./NumberRow"

const Numbers = ({ persons, newFilter, deletePerson }) => (
    <>
      <h2>Numbers</h2>
      <table>
        <tbody>
        {persons
          .filter(item => (item.name.toUpperCase().includes(newFilter.toUpperCase())) ? item : null)
          .map(item => <NumberRow key={item.id} person={item} deletePerson={deletePerson}/>  
        )}
        </tbody>
      </table>
    </>
  )

  export default Numbers