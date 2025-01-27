import axios from 'axios'
import { getClientSideURL, getServerSideURL } from './getURL'
import canUseDOM from './canUseDOM'

const axiosInstance = axios.create({
  baseURL: canUseDOM ? getClientSideURL() : getServerSideURL(),
  //   timeout: 1000,
})

export default axiosInstance
