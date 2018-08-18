import React, { Component } from 'react';
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'

@connect(
  state=>state
)

class Msg extends Component {
  getLastChat(arr){
    return arr[arr.length-1]
  }

  render() {

    const Item = List.Item;
    const Brief = Item.Brief
    const userid = this.props.user._id
    const userinfo = this.props.chat.users
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(item=>{
      msgGroup[item.chatid] = msgGroup[item.chatid]||[];
      msgGroup[item.chatid].push(item)
    })
    const chatList = Object.values(msgGroup).sort((a,b)=>{
      const a_last = this.getLastChat(a).create_time;
      const b_last = this.getLastChat(b).create_time;
      return b_last - a_last
    });

    return (
      <div>
        {chatList.map(v=>{
						const lastItem = this.getLastChat(v)
            const targetId = v[0].from==userid?v[0].to:v[0].from
            const unread = v.filter(i=>!i.read&&i.to==userid).length
						if (!userinfo[targetId]) {
							return null
						}
						return (
							<List key={lastItem._id}>
								<Item
                  thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                  extra={<Badge text={unread}></Badge>}
                  arrow="horizontal"
                  onClick={()=>{this.props.history.push(`/chat/${targetId}`)}}
								>
                  {lastItem.content}
                  
									<Brief>{userinfo[targetId].name}</Brief>
																
								</Item>
							</List>
						)
					})}

      </div>
    );
  }
}

export default Msg;
