import React from 'react'

class EditFishForm extends React.Component {
  handleChange = event => {
    console.log('event', event.currentTarget.value)
    // update that fish
    // 1. Take a copy of the current fish
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value
    }
    console.log('updatedFish', updatedFish)
    this.props.updateFish(this.props.index, updatedFish)
  }

  render () {
    return (
      <div key={this.props.index} className='fish-edit'>
        <input type='text' name='name' onChange={this.handleChange} value={this.props.fish.name} />
        <input type='text' name='price' onChange={this.handleChange} value={this.props.fish.price} />
        <select type='text' onChange={this.handleChange} name='status'>
          <option value='available'>Fresh</option>
          <option value='unavailable'>Sold Out</option>
        </select>
        <textarea name='desc' onChange={this.handleChange} value={this.props.fish.desc} />
        <input type='text' name='image' onChange={this.handleChange} value={this.props.fish.image} />
      </div>
    )
  }
}

export default EditFishForm
