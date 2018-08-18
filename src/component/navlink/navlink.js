import React,{Component} from 'react';
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

@connect(
  state=>state.chat
)
@withRouter
class NavLink extends Component {
  static propTypes = {
    navList:PropTypes.array.isRequired
  }

  render() {
    var navList = this.props.navList.filter((item)=>{return !item.hide})
    var pathname = this.props.location.pathname
    return (
      <div>
        <TabBar>
          {navList.map((item)=>{
            return <TabBar.Item badge={item.path=='/msg'?this.props.unread:0} title={item.text} icon={{uri:require(`./img/${item.icon}.png`)}} key={item.path}
              selectedIcon={{uri:require(`./img/${item.icon}-active.png`)}} selected={pathname===item.path} onPress={()=>{this.props.history.push(item.path)}}></TabBar.Item>
          })}
        </TabBar>
      </div>
    );
  }
}

export default NavLink;
