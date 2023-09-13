

const Part = (props) => {
  return (
    <>
      <p>{props.part} {props.exercises}</p>
    </>
  )
}


const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}
const Content = (props) => {
  return (
    <>
      {props.parts.map(value=><Part  part={value.name} exercises={value.exercises}/>)}
    </>
  )
}
const Total = (props) => {
  
  const exercises = props.parts.reduce((accumulator, part) =>accumulator + part.exercises, 0 )
  
  return (
    <>
      <p>Number of exercises {exercises}</p>
    </>
  )
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
    <>
     <Header course = {course.name} />
     <Content parts = {course.parts} />
      <Total  parts = {course.parts} /> 

    </>
  )
}

export default App
