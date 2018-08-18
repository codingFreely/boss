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

class Geniusinfo extends React.Component{
  constructor(props){
    super(props)
    this.state={
      title:"",
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
    var pathname = this.props.location.pathname;
    return(
      <div>
        {this.props.redirectTo&&this.props.redirectTo!=pathname?<Redirect to={this.props.redirectTo}></Redirect>:null}
        <NavBar mode="dark">BOSS完善信息页</NavBar>
        <p className="error-msg">{this.props.msg?this.props.msg:null}</p>
        <AvatarSelector chooseAvatar={this.handChange}></AvatarSelector>
        <WhiteSpace />
        <List>
          <InputItem onChange={(v)=>this.handChange('title',v)}>求职岗位</InputItem>
          <TextareaItem rows={3} autoHeight onChange={(v)=>this.handChange('desc',v)} title="个人简介"></TextareaItem>
          <WhiteSpace />
          <Button type="primary" onClick={()=>{this.props.update(this.state)}}>保存</Button>
        </List>
      </div>
    )
  }
}

export default Geniusinfo