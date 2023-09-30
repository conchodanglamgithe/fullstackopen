import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import CountryService from "./service/CountryAPI"
import WeatherService from "./service/WeatherAPI"
import Weather from './components/Weather'
const App = () =>{
  const [country, setCountry] = useState(null)
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const[filter, setFilter] = useState([])
  const [weather, setWeather] = useState(null)
  //ObjectArray -> NameArray  
    
  

  useEffect(() => {
    console.log("fetching countries.....")
    CountryService.getAll().then(countriesArray => setCountries(countriesArray)).then(()=>{
      console.log("done")
    })
    
  },[])
  useEffect(() => {
    console.log("fetching country info.....")
    console.log(filter.length)
    if(filter.length === 1){
     
      axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${filter[0]}`)
      .then(res => {
        setCountry(res.data)
      })
      
      
    }
    else{
      
      setCountry(null)
    }
    
  },[filter])
  useEffect(() => {
    console.log('useEffect ran. country is: ', country);
    if(country){
    WeatherService
        .getLatAndLon(country.capital[0])
        .then(({lat,lon}) => {
          WeatherService
          .getWeather(lat,lon)
          .then(weather=>setWeather(weather))

        })
    }
  }, [country]);
  useEffect(() => console.log(`useEffect ran, weather is`, weather) ,[weather])



  const handleChangeCountry = (event) => {
    console.log(event.target.value)
    console.log(countries)
    const filteredCountries = event.target.value ===""
    ?[]
    :countries.filter(country => country.toLowerCase().includes(event.target.value.toLowerCase()))
    setValue(event.target.value)
    setFilter(filteredCountries)
  }
  const handleShowButton =(countryN) => () => {
    const filteredCountries = countryN ===""
    ?[]
    :countries.filter(country => country.toLowerCase().includes(countryN.toLowerCase()))
    setFilter(filteredCountries)
    setValue(countryN)
  }
  if(countries.length <= 0)
    return<></>
  return (
   
      <div>
        <div>
          find countries <input value={value} onChange={handleChangeCountry}/>
        </div>
        {filter.length > 10 ? <p>too many matches, specify another filter</p>
                                       :filter.length === 1
                                       ?<></>
                                       :<>
                                           {filter.map(country =><div>
                                                                   {country}
                                                                   <button onClick={handleShowButton(country)}>show</button>
                                                                  </div>)} 
                                          
                                       </>
        }
        {
          country?<>
                    <Country name={country.name} capital={country.capital} languages={country.languages} area={country.area} flags={country.flags}/>
                    {weather?<Weather capital={country.capital[0]} temp={weather.main.temp} icon={weather.weather[0].icon} speed={weather.wind.speed}/>:<></>}
                  </>
                  :<></>
        }
        
      </div>
    
  )
}


export default App
