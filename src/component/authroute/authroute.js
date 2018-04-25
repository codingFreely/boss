import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {loadData} from '../../redux/user.redux'
@withRouter
@connect(
  null,
  {loadData}
)
class AuthRoute extends React.Component{
  componentDidMount(){//如果组件未被销毁，componentDidMount只会执行一次
    const publicList = ['/login','register']
    //如果已授权通过
    if(publicList.indexOf(this.props.location.pathname)!==-1){
      return null;
    }

    axios.get('/users/info').then(res=>{
      if(res.status==200){
        if(res.data.code == 0){
          this.props.loadData(res.data.data)
        }else{
          this.props.history.push('/login')
        }
      }
    })
  }

  render(){
    return <div></div>
  }
}

export default AuthRoute