import { useState } from 'react'


const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const getRandom = (max) => Math.floor(Math.random() * max)
  const [selected, setSelected] = useState(getRandom(anecdotes.length))
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0))
  const [top, setTop] = useState(0)
  

  const handleRandom = () => () => {
    const index = getRandom(anecdotes.length)
    setSelected(index)
  }

  const handleVote = () => () => {
    const index = selected
    const copy = [...vote]
    copy[selected]++
    setVote(copy)
    const max = Math.max(...copy)
    setTop(copy.indexOf(max))
  }


  return (
    <div>
      <h1>Anecdote of the days</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <Button handleClick={handleVote()} text="Vote"/>
      <Button handleClick={handleRandom()} text="Next anecdote"/>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[top]}</p>
      <p>has {vote[top]} votes</p>
    </div>
  )
}

export default App