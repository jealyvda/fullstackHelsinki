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
      props.parts.map(item => {
        return <Part key={item.id} name={item.name} exercises={item.exercises} />
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
    }
  
    const Course = ({ course }) => {
      return(
        <>
          <Header props={course.name}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
        </>
      )
    }

    export default Course