import axios from 'axios'
import {Toast} from 'antd-mobile'

//拦截请求
axios.interceptor.request.use(function(config){
  Toast.loading('加载中',0)
  return config
})

axios.interceptor.response.use(function(config){
  Toast.hide()
  return config
})