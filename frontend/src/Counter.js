import React, { Component } from 'react'

class Counter extends Component {
  // YOUR CODE GOES BELOW
  constructor(props) {
    super(props)
    this.count=0
    this.state = {
      count:0,
    };
    this.buttonStyles = {
      		border: '1px solid #ccc',
      		background: '#fff',
      		fontSize: '2em',
      		padding: 15, 
      		margin: 5, 
      		width: 200,
      	}
  } 

  handleUpClick = () => {
  	this.setState({count: this.state.count + 1});
  }

  handleDownClick = () => {
  	this.setState({count: this.state.count - 1});
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
      	<label 
      		style={{fontSize: '5em', display: 'block'}}
      	>
			Count = {this.state.count}
		</label>
      	<button onClick={this.handleUpClick} style={this.buttonStyles}>Increment</button>
      	<button onClick={this.handleDownClick} style={this.buttonStyles}>Decrement</button>
      </div>
    )
  }
}

export default Counter
