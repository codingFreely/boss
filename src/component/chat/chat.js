import React, { Component } from 'react';
import io from 'socket.io-client'
import {List,InputItem,Grid,NavBar,Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {recvMsg,sendMsg,getMsgList,readMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'

// const socket = io('ws://localhost:9093')
@connect(
  state=>state,
  {recvMsg,sendMsg,getMsgList,readMsg}
)

class Chat extends Component {
  constructor(props){
    super(props)
    this.state = {
      text:'',
      msg:[],
      showEmoji:false
    }
  }
  componentDidMount(){
    if (!this.props.chat.socketConnect) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  componentWillUnmount(){
    this.props.readMsg(this.props.match.params.user)
  }
  fixCarousel(){
    setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
		},0)
  }
  onSubmit(){
    // socket.emit('sendMsg',{text:this.state.text})
    var from = this.props.user._id;
    var to = this.props.match.params.user;
    var msg = this.state.text;
    this.props.sendMsg({from,to,msg})

    this.setState({
			text:''
		})
  }
  render() {
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
										.map(v=>({text:v}))
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const chatid = getChatId(from,to)
    const users = this.props.chat.users 
    const Item = List.Item;
    
    const chatmsg = this.props.chat.chatmsg.filter(v=>v.chatid==chatid)
    return (
      <div id='chat-page'>
        <NavBar
          mode='dark'
					icon={<Icon type="left" />}
					onLeftClick={()=>{
						this.props.history.goBack()
					}}
        >{users[to].name}</NavBar>
        {chatmsg.map(v=>{
          const avatar = require(`../img/${users[v.from].avatar}.png`)
					return v.from!==from?(
						<List key={v._id}>
							<Item
								thumb={avatar}
							>{v.content}</Item>
						</List>
					
					):(
						<List key={v._id}>
							<Item
								extra={<img src={avatar} />}
							 	className='chat-me'
							 	>{v.content}</Item>
						</List>

					)
        })}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={(v) => { this.setState({ text: v }) }}
              extra={
                <div>
                  <span
                    style={{ marginRight: 15 }}
                    onClick={() => {
                      this.setState({
                        showEmoji: !this.state.showEmoji
                      })
                      this.fixCarousel()
                    }}
                  >😃</span>
                  <span onClick={() => { this.onSubmit() }}>发送</span>
                </div>
              }
            ></InputItem>
          </List>
          {this.state.showEmoji?<Grid 
						data={emoji}
						columnNum={9}
						carouselMaxRow={4}
						isCarousel={true}
						onClick={el=>{
							this.setState({
								text:this.state.text+el.text
							})
							
						}}
					/>:null}
        </div>
      </div>
    );
  }
}

export default Chat;
