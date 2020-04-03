import axios from 'axios'

const MyhttpServer = {}

MyhttpServer.install = (Vue) =>{


  axios.defaults.baseURL='/';
  Vue.prototype.$http = axios
}

export default MyhttpServer
