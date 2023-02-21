import { useSelector, useDispatch } from "react-redux"

const App = () => {
  const dispatch = useDispatch()
   
  return(
    <div>
      <button
        onClick={e => dispatch({ type: 'GOOD' })}
      >
        good
      </button>
      <button
        onClick={e => dispatch({ type: 'OK' })}
      >
        OK
      </button>
      <button
        onClick={e => dispatch({ type: 'BAD' })}
      >
        bad
      </button>
      <p>Good: {useSelector((state) => (state.good))}</p>
      <p>OK: {useSelector((state) => (state.ok))}</p>
      <p>Bad: {useSelector((state) => (state.bad))}</p>

    </div>
  )
}

export default App
