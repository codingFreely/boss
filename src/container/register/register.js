import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem,Radio,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import form from '../../component/form/form'

@connect(
  state=>state.user,
  {register}
)
@form

class Register extends React.Component{
  constructor(props){
    super(props)
    // this.state = { //只用于组件内部交互，所以没必要redux
    //   type:'genius',
    //   pwd:'',
    //   repeatpwd:'',
    //   user:''
    // }
  }
  componentDidMount(){
    this.props.handleChange('type','genius')
  }
  // handleChange(key,v){
  //   this.setState({
  //     [key]:v
  //   })
  // }
  render(){
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        <Logo></Logo>
          {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
          {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
          <List>
            <InputItem onChange={(v)=>this.props.handleChange('user',v)}>用户</InputItem>
            <InputItem type='password' onChange={(v)=>this.props.handleChange('pwd',v)}>密码</InputItem>
            <InputItem type='password' onChange={(v)=>this.props.handleChange('repeatpwd',v)}>确认密码</InputItem>
            <RadioItem onChange={(v)=>this.props.handleChange('type','genius')} checked={this.props.state.type=='genius'}>牛人</RadioItem>
            <RadioItem onChange={(v)=>this.props.handleChange('type','boss')} checked={this.props.state.type=='boss'}>boss</RadioItem>
            
          </List>
          <WhiteSpace />          
          <Button type="primary"  onClick={()=>{this.props.register(this.props.state)}}>注册</Button>
      </div>
    )
  }
}

export default Register