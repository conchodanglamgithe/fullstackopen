import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const create = (personObject) => {
    const req = axios.post(baseUrl, personObject)
    return req.then((res) => res.data)
}

const del = (id) =>{
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then((res) => res.data)
}

const update = (oldPersonObject, newPersonObject) =>{
    const req = axios.put(`${baseUrl}/${oldPersonObject.id}`,newPersonObject)
    return req.then((res) => res.data)
}
export default {getAll, create, del, update}