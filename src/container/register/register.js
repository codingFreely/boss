import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem,Radio,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
  state=>state.user,
  {register}
)

class Register extends React.Component{
  constructor(props){
    super(props)
    this.state = { //只用于组件内部交互，所以没必要redux
      type:'genius',
      pwd:'',
      repeatpwd:'',
      user:''
    }
  }
  handleChange(key,v){
    this.setState({
      [key]:v
    })
  }
  render(){
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        <Logo></Logo>
          {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
          {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
          <List>
            <InputItem onChange={(v)=>this.handleChange('user',v)}>用户</InputItem>
            <InputItem type='password' onChange={(v)=>this.handleChange('pwd',v)}>密码</InputItem>
            <InputItem type='password' onChange={(v)=>this.handleChange('repeatpwd',v)}>确认密码</InputItem>
            <RadioItem onChange={(v)=>this.handleChange('type','genius')} checked={this.state.type=='genius'}>牛人</RadioItem>
            <RadioItem onChange={(v)=>this.handleChange('type','boss')} checked={this.state.type=='boss'}>boss</RadioItem>
            
          </List>
          <WhiteSpace />          
          <Button type="primary"  onClick={()=>{this.props.register(this.state)}}>注册</Button>
      </div>
    )
  }
}

export default Register