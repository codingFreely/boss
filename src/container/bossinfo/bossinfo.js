import React from 'react'
import {Button,List,InputItem,WhiteSpace,NavBar,TextareaItem} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {update} from '../../redux/user.redux'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

@connect(
  state=>state.user,
  {update}
)

class Bossinfo extends React.Component{
  constructor(props){
    super(props)
    this.state={
      title:"",
      company:"",
      money:"",
      desc:"",
      avatar:""
    }
    this.handChange=this.handChange.bind(this)
  }
  handChange(k,v){
    this.setState({
      [k]:v
    })
  }
  render(){
    return(
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
        <NavBar mode="dark">BOSS完善信息页</NavBar>
        <p className="error-msg">{this.props.msg?this.props.msg:null}</p>
        <AvatarSelector chooseAvatar={this.handChange}></AvatarSelector>
        <WhiteSpace />
        <List>
          <InputItem onChange={(v)=>this.handChange('title',v)}>招聘职位</InputItem>
          <InputItem onChange={(v)=>this.handChange('company',v)}>公司名称</InputItem>
          <InputItem onChange={(v)=>this.handChange('money',v)}>职位薪资</InputItem>
          <TextareaItem rows={3} autoHeight onChange={(v)=>this.handChange('desc',v)} title="职位要求"></TextareaItem>
          <WhiteSpace />
          <Button type="primary" onClick={()=>{this.props.update(this.state)}}>保存</Button>
        </List>
      </div>
    )
  }
}

export default Bossinfo