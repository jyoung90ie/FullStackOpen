import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
        .then(response => response.data)
        .catch(error => console.log('error retrieving data from persons',
            error))
}

const create = (personObject) => {
    return axios.post(baseUrl, personObject)
        .then(response => response.data)
        .catch(error => console.log('error adding person', error))
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
        .then(response => response)
        .catch(error => console.log('could not delete person object', error))
}

const update = (id, personObject) => {
    return axios.patch(`${baseUrl}/${id}`, personObject)
        .then(response => response.data)
        .catch(error => console.log('could not update phone number for person object', error))
}

export default { getAll, create, remove, update }