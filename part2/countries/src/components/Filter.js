const Filter = ({ newFilter, handleFilterChange }) => (
    <div>
      find countries 
      <input
        value={newFilter}
        onChange={handleFilterChange}
      />
    </div>
  )

  export default Filter