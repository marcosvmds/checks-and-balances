import axios from 'axios'

const baseURL = process.env.API_URL || "localhost:3001"

const api = axios.create({
    baseURL: "https://checks-and-balances.herokuapp.com/"
})

console.log(baseURL)

export default api