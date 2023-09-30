import Header from "./Header"
import Content from "./Content"
import Total from "./Total"
const Course = ({course}) => {
    const totalArray = course.parts.map(part => part.exercises)
    const sumTotal = totalArray.reduce((accum, currentValue) => accum + currentValue)
    
    return(
       <>
        <Header courseName={course.name}/>
        <Content parts={course.parts}/>
        <Total value={sumTotal}/>
       </> 
    )
}

export default Course