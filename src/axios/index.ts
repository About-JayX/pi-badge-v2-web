import axios, { AxiosError } from 'axios'

// import { useStoreSelector } from '@/hook'

// 创建一个axios实例
const api = axios.create()

// 向axios实例添加错误处理程序
api.interceptors.response.use(
  response => {
    const data = response.data
    return data.data || data.data === null ? data.data : data
  },
  (error: AxiosError) => {
    console.error('request failed:', error)
    throw error
  }
)

// 添加请求拦截器
api.interceptors.request.use(
  config => {
    // 设置请求头，允许跨域请求
    config.headers['Access-Control-Allow-Origin'] = '*'
    config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
    config.headers['Access-Control-Allow-Headers'] =
      'Content-Type, Authorization'
    const token = location.pathname.replace('/', '')

    config.headers['authorization'] = token
    return config
  },
  error => {
    console.error('request Interceptor error:', error)
    return Promise.reject(error)
  }
)

export default api
