import axios from "axios"

const getName = (countriesObjects) => countriesObjects.map(country => country.name.common)
const getAll = () => {
    return axios
            .get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(res => {
            const data = getName(res.data)
            return data
      })
}

export default {getAll}