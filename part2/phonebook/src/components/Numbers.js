import NumberRow from "./NumberRow"

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

  export default Numbers