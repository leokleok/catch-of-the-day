import React, { Component } from 'react'
import { formatPrice } from '../helpers'

class Order extends Component {

  renderOrder = key => {
    const fish = this.props.fishes[key] // fish object
    const count = this.props.orders[key] // value which is qty of fishes
    const isAvailable = fish && fish.status === 'available'
    if(!fish) return null //this is to make fishes available before we load order
    if(!isAvailable) {
      return <li key={key}> Sorry {fish ? fish.name : 'fish'} is no longer available </li>
    }

    return <li key={key}>
      {count} lbs {fish.name}
      {formatPrice(count * fish.price)}
    </li>
  }

  render () {
    const orderIds = Object.keys(this.props.orders)

    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key] // fish object
      const count = this.props.orders[key] // value which is qty of fishes
      const isAvailable = fish && fish.status === 'available'
      if (isAvailable) {
        return prevTotal + (count * fish.price)
      }
      return prevTotal
    }, 0)

    return (
      <div className='order-wrap'>
        <h2>Your Order</h2>
        <ul className='order'>
          {orderIds.map(this.renderOrder)}
        </ul>
        <div className='total'>
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}

export default Order
