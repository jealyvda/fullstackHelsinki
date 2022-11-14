const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}
const App = () => {
  const name = 'Jealy'
  const age = 10

  return(<>
    <h1>Greetings</h1>
    <Hello name="Jealy" age={22+2}/>

    <Hello name={name} age={age}/>
  </>)
}

export default App