import { Switch } from "react-router-dom";
import axois from 'axios'

const GET_USER_LIST_SUCCESS = 'GET_USER_LIST_SUCCESS'

export function chatuser(state={userList:[]},action){//reducer函数名与状态名相同
  switch (action.type) {
    case GET_USER_LIST_SUCCESS:
      return {...state,userList:action.data}
      break;
  
    default:
      return state;
  }
}

function getUserListSuccess(data){
  return {data:data,type:GET_USER_LIST_SUCCESS}
}

export function getUserList(type){
  return dispatch=>{
    axois.get('users/list?type='+type).then(res=>{
      if(res.data.code==0){
        dispatch(getUserListSuccess(res.data.data))
      }
    })
  }
}