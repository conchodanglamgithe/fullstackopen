const Weather = ({capital, temp, icon, speed}) =>{
    return(
        <dix>
            <h2>Weather in {capital}</h2>
            <p>temperature {Math.round((temp - 273.15) * 100) / 100} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}/>
            <p>wind {speed} m/s</p>
        </dix>
    )

}
export default Weather