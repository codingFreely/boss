import React from 'react'
import {Grid,List} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component{
  static propTypes = {
    chooseAvatar:PropTypes.func.isRequired
  }

  constructor(props){
    super(props)
    this.state={
      avatar:""
    }
  }
  render(){
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'.split(',')
      .map(v=>{
        return {
          text:v,
          icon:require(`../img/${v}.png`)
        }
      });
    var gridHeader = this.state.avatar?(<div>
                                        <span>已选择头像</span>
                                        <img src={this.state.avatar} style={{width:20}} alt=""/>
                                      </div>):"请选择头像"
  
    return (
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid data={avatarList} columnNum={5} onClick={(item)=>{
            this.setState({avatar:item.icon})
            this.props.chooseAvatar("avatar",item.text)
          }}/>
        </List>
      </div>
    )
  }
}

export default AvatarSelector