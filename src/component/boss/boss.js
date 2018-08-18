import React, { Component } from 'react'
import UserCard from '../usercard/usercard'
// import {connect} from 'react-redux'
// import {getUserList} from '../../redux/chatuser.redux'
// import {Card,WingBlank,WhiteSpace} from 'antd-mobile'

// @connect(
//   state=>state.chatuser,
//   {getUserList}
// )

class Boss extends Component {
  render() {
    return (
      <div>
        <UserCard></UserCard>
      </div>
    );
  }
}

export default Boss;
