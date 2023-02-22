import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter
      <input
        type="text"
        name="filter"
        onChange={handleChange}
      />
    </div>
  )
}

export default VisibilityFilter