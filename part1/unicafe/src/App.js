import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => {
  return(
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value} {(text=="positive") ? '%' : null}
      </td>
    </tr>
  )}
  
const Statistics = ({ good, neutral, bad, all, avg}) => {
  return(
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={avg/all} />
        <StatisticLine text="positive" value={good/all*100}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAvg(avg + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAvg(avg - 1)
  }

  return (
    <div>
      <h1>
        give feedback
      </h1>
      <Button text='good' handleClick={handleGood}/>
      <Button text='neutral' handleClick={handleNeutral}/>
      <Button text='bad' handleClick={handleBad}/>
      <h1>
        statistics
      </h1>
      {(all > 0)
      ? <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        avg={avg}
      /> 
      : (<p>No feedback given</p>)
      }
    </div>
  )
}

export default App