import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Opcional: especifica el tiempo máximo (en milisegundos) antes de que se interrumpa una solicitud.
})

export default axiosInstance
