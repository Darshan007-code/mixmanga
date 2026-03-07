import axios from 'axios'

class BackendService {
  constructor() {
    this.URL = import.meta.env.VITE_BACKEND_URL || (window.location.origin.includes('localhost') ? 'http://localhost:5000' : 'https://mixmanga.onrender.com')
  }

  get(url, params) {
    return axios.get(this.URL + url, { params })
  }

  post(url, data) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        token: localStorage.getItem('token') || '',
      },
    }
    return axios.post(this.URL + url, data, config)
  }
}

const Backend = new BackendService()

export default Backend
