import axios from 'axios'

const baseURL = process.env.API_URL

const api = axios.create({
    baseURL
})

console.log(baseURL)

export default api