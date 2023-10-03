import { useState } from 'react'

const useCounter = () => {
  const [value, setValue] = useState(0)

  const increase = () => {
    setValue(value + 1)
  }

  const decrease = () => {
    setValue(value - 1)
  }

  const zero = () => {
    setValue(0)
  }

  return {
    value, 
    increase,
    decrease,
    zero
  }
}

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const App = () => {
  const counter = useCounter()
  const left = useCounter()
  const right = useCounter()

  const name = useField('text')
  const birthdate = useField('date')
  const height = useField('number')

  return (
    <div>
      <div>
        <h1> Counter </h1>
        <div>{counter.value}</div>
        <button onClick={counter.increase}>
          plus
        </button>
        <button onClick={counter.decrease}>
          minus
        </button>      
        <button onClick={counter.zero}>
          zero
        </button>
      </div>
      <div>
        <h1>Counter left and right clicks</h1>
        {left.value}
        <button onClick={left.increase}>
          left
        </button>
        <button onClick={right.increase}>
          right
        </button>
        {right.value}
      </div>
      <div>
        <h1>Forms </h1>
        <form>
          <input {...name} /> 
          <br />
          <input {...birthdate} /> 
          <br />
          <input {...height} /> 
          <br />
        </form>
        <div>
        {name.value} {born.value} {height.value} 
      </div>
      </div>
    </div>
  )
}