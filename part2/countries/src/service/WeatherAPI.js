import axios from "axios"

const api_key = import.meta.env.VITE_WEATHER_API_KEY

const getLatAndLon = (cityName) => {
    console.log(api_key)
    const req = axios
                    .get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`)
    return req.then(res => {
        const lat = res.data[0].lat
        const lon = res.data[0].lon
        console.log(lat,lon)
        return {lat,lon}
    })
    
}

const getWeather = (lat,lon) => {
    const req = axios 
                    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
    return req.then((res) => res.data)
}

export default {getLatAndLon, getWeather}