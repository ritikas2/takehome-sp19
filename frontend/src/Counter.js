import React, { Component } from 'react'

class Counter extends Component {
  // YOUR CODE GOES BELOW
  constructor(props) {
    super(props)
    this.state = {
      count:this.props.episodes_seen,
    };
    this.buttonStyles = {
      		border: '1px solid #ccc',
      		background: '#fff',
      		fontSize: '1em',
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
      		style={{fontSize: '2em', display: 'block'}}
      	>
			Episodes Seen = {this.state.count}
		</label>
      	<button onClick={this.handleUpClick} style={this.buttonStyles}>Increment</button>
      	<button onClick={this.handleDownClick} style={this.buttonStyles}>Decrement</button>
      	<br />
      </div>
    )
  }
}

export default Counter
