import aixos from 'axios'
import {getRedirectPath} from '../util'

// const REGISTER_SUCCESSS = 'REGISTER_SUCCESSS'
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGIN_OUT = 'LOGIN_OUT'

const initState = {
  redirectTo:'',
  msg:'',
  user:'',
  type:'',//boss or genius
  _id:''
}

export function user(state = initState,action){
  switch (action.type) {
    case AUTH_SUCCESS:
      return {...state,redirectTo:getRedirectPath(action.data),...action.data}
      break;
    case LOAD_DATA:
      return {...state,isAuth:true,...action.data}
      break;
    case LOGIN_OUT:
      return {...initState,redirectTo:"/login"}
      break;     
    case ERROR_MSG:
      return {...state,isAuth:false,msg:action.msg}
      break;
    default:
      return state;
  }
}

//action creater

// function registerSuccess(data){
//   return {data:data,type:REGISTER_SUCCESSS}
// }

// function loginSuccess(data){
//   return {data:data,type:LOGIN_SUCCESS}
// }
function authSuccess(data){
  return {data:data,type:AUTH_SUCCESS}
}

export function loadData(data){
  return {data:data,type:LOAD_DATA}
}

function errorMsg(msg){
  return {msg:msg,type:ERROR_MSG}
}

export function loginOutSubmit(){
  return {type:LOGIN_OUT}
}
//既有同步action又有异步action
export function register({user,pwd,repeatpwd,type}){
  if(!user||!pwd||!type){
    return errorMsg('用户名密码必须输入')
  }
  if(pwd!==repeatpwd){
    return errorMsg('密码和确认密码不同')
  }
  return (dispatch)=>{
    aixos.post('/users/register',{user,pwd,type}).then(res=>{
      if(res.status===200&&res.data.code===0){
        dispatch(authSuccess({user,pwd,type}))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function login({user,pwd}){
  if(!user||!pwd){
    return errorMsg('用户名密码必须输入')
  }
  return (dispatch)=>{
    aixos.post('/users/login',{user,pwd}).then(res=>{
      if(res.status===200&&res.data.code===0){
        dispatch(authSuccess(res.data.data))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function update({title,company,money,desc,avatar}){
  // if(!title||!company||!money||!desc||!avatar){
  //   return errorMsg('请填写完整的用户信息')
  // }
  return (dispatch)=>{
    aixos.post('/users/update',{title,company,money,desc,avatar}).then(res=>{
      if(res.status===200&&res.data.code===0){
        dispatch(authSuccess(res.data.data))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}