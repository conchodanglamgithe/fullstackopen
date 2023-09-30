const Country = ({name, capital,languages,area, flags}) => {
    return(
    <div>
        <h1>{name.common}</h1>
        <div>
            capital {capital.map(cap => 
              cap 
         )}
        </div>
        <p>
            area {area}
        </p>
        
        <div>
            <h4>language:</h4>
            <ul>
                {Object.values(languages).map(lang => <li>{lang}</li>)}
            </ul>
        </div>
        <div>
            <img src={flags.png}/>
        </div>
    </div>
    )
}
export default Country