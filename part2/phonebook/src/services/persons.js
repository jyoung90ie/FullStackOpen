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

export default { getAll, create }