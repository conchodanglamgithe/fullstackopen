import { useState } from 'react'
const Header = ({text}) => <h1>{text}</h1>
const Button = ({handleClick, rate}) => <button onClick={handleClick}> {rate} </button>

const Buttons = ({props}) => {
  return (<>
          {props.map(prop => <Button key={prop.key} handleClick={prop.handleClick} rate={prop.stats}/>)}
          
          </>)
}

const StatisticLine = ({value, text}) => <tbody>
                                          <tr>
                                            <td>{text}</td> 
                                            <td>{value}</td>
                                          </tr>
                                          </tbody>
const Statistics = ({props}) => props.map(prop =><StatisticLine key={prop.key} value={prop.value} text={prop.stats}/>)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [percentage, setPercentage] = useState(0)

  const handleGood = () => () => {
    const updatedGood = good + 1
    const updatedTotal = updatedGood + bad + neutral
    setGood(updatedGood)
    setTotal(updatedTotal)
    setAverage((updatedGood * 1 + bad * -1) / updatedTotal)
    setPercentage(updatedGood/updatedTotal * 100)
  }

  const handleNeutral = () => () => {
    const updatedNeutral = neutral + 1
    const updatedTotal = good + bad + updatedNeutral
    setNeutral(updatedNeutral)
    setTotal(updatedTotal)
    setAverage((good * 1 + bad * -1) / updatedTotal)
    setPercentage(good/updatedTotal * 100)
  }

  const handleBad = () => () => {
    const updatedBad = bad + 1
    const updatedTotal = good + updatedBad + neutral
    setBad(updatedBad)
    setTotal(updatedTotal)
    setAverage((good * 1 + updatedBad * -1) / updatedTotal)
    setPercentage(good/updatedTotal * 100)
  }
  const props = [
    { 
      key:1,
      value: good,
      stats : "good",
      handleClick:handleGood()
    },
    {
      key:2,
      value:neutral,
      stats : "neutral",
      handleClick:handleNeutral()
    },
    {
      key:3,
      value:bad,
      stats : "bad",
      handleClick:handleBad()
    }
  ]

  const propsMore = [
    {
      key:4,
      value: total,
      stats : "all",
     
    },
    {
      key:5,
      value: average,
      stats : "average",
     
    },
    {
      key:6,
      value: percentage + '%',
      stats : "positive",
     
    }
  ]
  return (
    <div>
      <Header text="give feedback"/>
      <Buttons props={props}/>
      <Header text="statistics"/>
      {total === 0? <p>No feedback given</p>
      :<table><Statistics props={props}/>
         <Statistics props={propsMore}/>
       </table>
      }
      
    </div>
  )
}

export default App