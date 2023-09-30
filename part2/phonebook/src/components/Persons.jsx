const Persons = ({persons, handleDelete}) => {
    

    return(
        <div>
            {persons.map(person => {
                                    return(
                                        <div  key={person.id}>
                                            
                                            <p style={{display: "inline"}}>{person.name} {person.number}</p>
                                            <button onClick={handleDelete(person.id)}>delete</button>
                                        </div>
                                    )
                                })}
        </div>
    
    )
}

export default Persons