const Header = (props) => {
  return (
    <h1>Hello {props.props}</h1>
  )
}


const Part = (props) => {
  return (<p>
    {props.name} {props.exercises}
  </p>)
}

const Content = (props) => {
  return (
  <div>
    {
    props.parts.map((item, index) => {
      return <Part key={`${index}_${item.name}`} name={item.name} exercises={item.exercises} />
    })
  }
  </div>
  )
  }

  const Total = (props) => {
    return (<p>
      Number of exercises {props.parts.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.exercises
      }, 0)}
      </p>)
    // return (
  }

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header props={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App