import axios from 'axios'

const request = axios.create({
  baseURL: 'http://missblog.net:3000',
  // baseURL: 'http://192.168.2.12:3000',
  timeout: 3000,
  withCredentials: true,
  method: 'get'
})

export default request
