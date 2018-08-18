import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import {Card,WingBlank,WhiteSpace} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
@connect(
  state=>state,
  {getUserList}
)
class UserCard extends Component {
  componentDidMount(){
    this.props.getUserList(this.props.location.pathname==='/genius'?'boss':'genius')
  }

  render() {
    return (
      <div>
        <WingBlank>
        <WhiteSpace />
          {this.props.chatuser.userList.map(item=>{
            return item.avatar?(<div onClick={()=>{this.props.history.push(`/chat/${item._id}`)}} key={item._id}><Card>
              <Card.Header title={item.user} thumb={require(`../img/${item.avatar}.png`)}
                extra={<span>{item.title}</span>}
              ></Card.Header>
              <Card.Body>
                {item.desc.split('\n').map(i=>{
                  return <div key={i}>{i}</div>
                })}
                {item.type==='boss'?<div>薪资：{item.money}</div>:null}
              </Card.Body>
            </Card><WhiteSpace /></div>):null
          })}
        </WingBlank>
      </div>
    );
  }
}

export default UserCard;
