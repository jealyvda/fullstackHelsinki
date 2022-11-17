
const NumberRow = ({ person, deletePerson }) => {
  console.log(person.id)
  return(
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>
        <form onSubmit={() => deletePerson(person.id)}>
          <button type="submit">delete</button>
        </form>
      </td>
    </tr>
  )}

export default NumberRow