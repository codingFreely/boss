import React from 'react'
import {connect} from 'react-redux'
import {Result, List,Brief,WhiteSpace,Modal} from 'antd-mobile'
// import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import browserCookie from 'browser-cookies'
import {loginOutSubmit} from '../../redux/user.redux'

@connect(
	state=>state.user,
	{loginOutSubmit}
)
class User extends React.Component{
	constructor(props){
		super(props)
		this.loginOut = this.loginOut.bind(this);
	}

	loginOut(){
		const alert = Modal.alert;
		alert('注销', '确认退出登录吗???', [
			{ text: '取消', onPress: () => console.log('cancel'), style: 'default' },
			{ text: '确认', onPress: () => {
				browserCookie.erase('userid')
				this.props.loginOutSubmit()
			} },
		]);
	}

	render(){
		const props = this.props
		const Item = List.Item
		const Brief = Item.Brief
		console.log(props)
		return props.user?(
			<div>
				<Result
					img={<img src={require(`../img/${props.avatar}.png`)} style={{width:50}} alt="" />}
					title={props.user}
					message={props.type=='boss'?props.company:null}
				/>
				
				<List renderHeader={()=>'简介'}>
					<Item
						multipleLine
					>
						{props.title}
						{props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
						{props.money?<Brief>薪资:{props.money}</Brief>:null}
					</Item>
					
				</List>
				<WhiteSpace></WhiteSpace>
				<List>
					<Item onClick={this.loginOut}>退出登录</Item>
				</List>
			</div>
		):<Redirect to={props.redirectTo} />

	}
}


export default User
