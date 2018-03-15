import React, { Component } from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'

import sampleFishes from '../sample-fishes'  // no caps because this is not a class component

class App extends Component {
  state = {
    fishes: {},
    order: {}
  }

  componentDidMount() {
    //first reinstate our localStorage
    const { params } = this.props.match
    const localStorageRef = localStorage.getItem(params.storeId) //gives the value, which is an object
    if(localStorageRef) {
      this.setState({order: JSON.parse(localStorageRef)}) //parse because object key is in string.
    }
  }

  componentDidUpdate() {
    console.log(this.state.order)
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order))
  }

  addFish = fish => {
    // 1. Always take a copy of the existing state
    // 2. Add our new fish to our fishes variable
    const children = {...this.state.fishes}
    //enhancing technique, when the key in the object is dynamic; usually a date
    children[`fish${Date.now()}`] = fish
    this.setState({
      fishes: children
    })
  }

  updateFish = (key, updatedFish) => {
    // 1. take a copy of the current state
    const fishes = {...this.state.fishes}
    //2. Update that state
    fishes[key] = updatedFish
    // 3. Set that to state.
    this.setState({fishes: fishes})
  }

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder = key => {
    // 1. take a copy of state
    const order = {...this.state.order}
    // 2. Either add to the order or update the order qty
    order[key] = order[key] + 1 || 1
    // 3.call setState to update the state object
    this.setState({order: order})
  }

  render () {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market' />
          <ul className='fishes'>
            {Object.keys(this.state.fishes).map( key => {
              return <Fish key={key} details={this.state.fishes[key]} index={key} addToOrder={this.addToOrder} />
            })}
          </ul>
        </div>
        <Order fishes={this.state.fishes} orders={this.state.order} />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    )
  }
}

export default App
