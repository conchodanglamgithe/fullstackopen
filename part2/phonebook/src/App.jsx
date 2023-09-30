import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/contacts'
import SuccessNoti from './components/SuccessNoti'
import ErrorNoti from './components/ErrorNoti'
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personService
              .getAll()
              .then(initialContacts => setPersons(initialContacts))
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const makeid= (length) =>{
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const temp = persons.find(person => person.name === newName)
    
    if(typeof temp !== 'undefined') {
     
      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one ?`)){
        const updatedPerson = {...temp, number: newNumber}
        personService
                  .update(updatedPerson)
                  .then((returnedContact) => {
                    
                    setPersons(persons.filter(person => person.name !== newName).concat(returnedContact))
                    setNewName('')
                    setNewNumber('')
                    setSuccessMessage(`${returnedContact.name}'s number is changed`)
                    setTimeout(() => {
                      setSuccessMessage(null)
                    }, 5000)
                  })
                  .catch((error) => {
                    setErrorMessage(`Information of ${temp.name} has already been remove from the server`)
                    setPersons(persons.filter(person => person.name !== temp.name))
                    setTimeout(() => {
                      setErrorMessage(null)
                    }, 5000)
                  })
                 
        return
      }
      return
        
    }

    const person = {
      name:   newName,
      number: newNumber,
      id:     makeid(9)
    } 

    personService
              .create(person)
              .then((returnedContact) => {
                setPersons(persons.concat(returnedContact))
                setNewName('')
                setNewNumber('')
                setSuccessMessage(`added ${returnedContact.name}`)
                setTimeout(() => {
                  setSuccessMessage(null)
                }, 5000)
        
              })
 
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  } 

  const filterPerson = filter===""
                                  ?persons
                                  :persons.filter(person => person.name.toLowerCase().match(filter.toLowerCase()))

  const handleDelete = (id) => () => {
    const person = filterPerson.find(person => person.id === id)
    const {name} = person
    // console.log(name)
    if (window.confirm(`Delete ${name}`)) {
      personService
                .del(id)
                .then(() => {
                  setPersons(filterPerson.filter(person => person.id !== id))
                });
    }
      
      
    }
  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage?<ErrorNoti message={errorMessage}/>:<></>}
      {successMessage?<SuccessNoti message={successMessage}/>:<></>}
        <Filter filter={filter} handleFilter={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm handleSubmit={handleSubmit}
                  name={newName} handleName={handleNameChange}
                  number={newNumber} handleNumber={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={filterPerson} handleDelete={handleDelete}/>
    </div>
  )
}

export default App