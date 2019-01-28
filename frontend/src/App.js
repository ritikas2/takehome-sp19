import React, { Component } from 'react'
import Instructions from './Instructions'
import Show from './Show'
import Counter from './Counter'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shows: [
        {id: 1, name: "Game of Thrones", episodes_seen: 0},
        {id: 2, name: "Naruto", episodes_seen: 220},
        {id: 3, name: "Black Mirror", episodes_seen: 3},
      ]
    }
  }

  handleClick = () => {
    
    this.setState(prevState => ({shows: [...prevState.shows, {id: 4, name: this.input.value, episodes_seen: 0}]}))

  }

  render() {
    return (
      <div className="App">
        <Instructions complete={true}/>
        {this.state.shows.map(x => (
          <Show id={x.id} name={x.name} episodes_seen={x.episodes_seen} />
        ))}

        <button type="button" onClick={this.handleClick}>
        <label>
          Show Name:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </button>


      </div>
    )
  }
}

export default App
