import React from 'react'

export default function form(Comp){
  return class WrapperComp extends React.Component {
    constructor(props){
      super(props)
      this.state = {}
      this.handleChange = this.handleChange.bind(this)
    }
    handleChange(key,v){
      this.setState({
        [key]:v
      })
    }
    render() {
      return (
          <Comp {...this.props} handleChange={this.handleChange} state={this.state}></Comp>
      );
    }
  }
}