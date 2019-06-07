import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://fast-tor-43250.herokuapp.com/api'
});