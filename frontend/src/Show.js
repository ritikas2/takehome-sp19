import React, { Component } from 'react'
import Counter from './Counter'

class App extends Component {
  // YOUR CODE GOES BELOW
  render() {
    return (
    	<div style={{textAlign: 'left'}}>
    	<br />
      	<label 
      		style={{fontSize: '1.5em', display: 'block'}}
      	>
			NAME = {this.props.name}
			<Counter episodes_seen={this.props.episodes_seen} />

		</label>
      	
      </div>
    )
  }
}

export default App
