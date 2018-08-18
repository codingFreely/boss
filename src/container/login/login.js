import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {connect} from "react-redux"
import {login} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import form from '../../component/form/form'

@form
@connect(
  state=>state.user,
  {login}
)
class Login extends React.Component{
  constructor(props){
    super(props)
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  register(){
    this.props.history.push('./register')
  }
  handleLogin(){
    this.props.login(this.props.state)
  }
  render(){
    return (
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
        <Logo></Logo>
        <WingBlank>
          <p className="error-msg">{this.props.msg?this.props.msg:null}</p>
          <List>
            <InputItem onChange={v=>this.props.handleChange('user',v)}>用户</InputItem>
            <WhiteSpace />
            <InputItem onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
          </List>
          <WhiteSpace />          
          <Button type="primary" onClick={this.handleLogin}>登陆</Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login