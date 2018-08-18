import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')
// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'
const SOCKET_CONNECT = 'SOCKET_CONNECT'

const initState = {
  chatmsg:[],
  users:{},//所有用户信息的列表
  unread:0,//未读消息数量
  socketConnect:false
}

//reducer
export function chat(state=initState,action){
  switch (action.type) {
    case MSG_LIST:
      const length = action.msglist.filter(i=>{
        return !i.read&&i.to===action.userid
      }).length
      return {...state,chatmsg:action.msglist,users:action.users,unread:length}

    case MSG_RECV:
      const num = action.userid===action.data.to?1:0
      const chatmsg = (action.data.to==action.userid||action.data.from==action.userid)?[...state.chatmsg,action.data]:state.chatmsg;
      return {...state,chatmsg:chatmsg,unread:state.unread+num}
    
    case MSG_READ:
      return {...state,chatmsg:state.chatmsg.map(v=>({...v,read:v.from===action.from?true:v.read})),unread:state.unread-action.num}
      break;
    
    case SOCKET_CONNECT:
      return {...state,socketConnect:true}
    default:
      return state
  }
}

//action
function msgRecv(data,userid){
  return {type:MSG_RECV,data,userid}
}

function msgList({msglist,users},userid){
  return {type:MSG_LIST,msglist,users,userid}
}

function msgRead({from,num}){
  return {type:MSG_READ,from,num}
}

export function socketConnect(){
  return {type:SOCKET_CONNECT}
}
//async action
export function recvMsg(){
  return (dispatch,getState)=>{
    dispatch(socketConnect())
    socket.on('recMsg',(msg)=>{
      dispatch(msgRecv(msg,getState().user._id))
    })
  }
}

export function getMsgList(){
  return (dispatch,getState)=>{
    axios.post('/users/getmsglist')
      .then(res=>{
        dispatch(msgList(res.data,getState().user._id))
      })
  }
}

export function readMsg(from){
  return dispatch=>{
    axios.post('/users/readmsg',{from})
      .then(res=>{
        if(res.data.code==0){
          dispatch(msgRead({from,num:res.data.num}))
        }
      })
  }
}
//other
export function sendMsg({from ,to ,msg}){
	return dispatch=>{
		socket.emit('sendMsg',{from ,to ,msg})
	}
}