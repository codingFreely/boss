import React from 'react'
import {Route,Switch} from 'react-router-dom'
import {NavBar} from 'antd-mobile'
import {connect,} from 'react-redux'
import NavLink from '../../component/navlink/navlink'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import Msg from '../../component/msg/msg'
import {recvMsg,getMsgList} from '../../redux/chat.redux'
// import {withRouter} from 'react-router-dom'

// @withRouter
@connect(
	state=>state,
	{recvMsg,getMsgList}
)

class Dashboard extends React.Component{
	componentDidMount(){
    if (!this.props.chat.socketConnect) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }

  render(){
    var user = this.props.user;

    const navList = [
			{
				path:'/boss',
				text:'牛人',
				icon:'boss',
				title:'牛人列表',
				component:Boss,
				hide:user.type=='genius'
			},
			{
				path:'/genius',
				text:'boss',
				icon:'job',
				title:'BOSS列表',
				component:Genius,
				hide:user.type=='boss'
			},
			{
				path:'/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				component:Msg
			},
			{
				path:'/me',
				text:'我',
				icon:'user',
				title:'个人中心',
				component:User
			}
		]
    
    return(
      <div>
        <NavBar className="fixd-header">{navList.find((item)=>{return item.path==this.props.location.pathname}).title}</NavBar>
        <div className="">
          <Switch>
            {
              navList.map(item=>{
                return (<Route path={item.path} key={item.path} component={item.component}></Route>)
              })
            }
          </Switch>
        </div>
        <NavLink navList={navList}></NavLink>
      </div>
    )
  }
}

export default Dashboard