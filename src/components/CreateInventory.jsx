import React, { Component } from 'react';
import axios from 'axios';

const mapper = (data) => {
  const { description, __v, ...otherProp } = data;
  return otherProp;
};
class CreateInventory extends Component {
  state = {
    status: [],
  };
  async componentDidMount() {
    const response = await axios.get('http://localhost:3001/api/categories');
    this.setState({ status: response.data.map(mapper) });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.onCreateInventory();
  }
  render() {
    const { _id, name, description, status, deliveryDate } = this.props.inventory;
    return (
      <div>
        <h3>Inventory</h3>
        <form onSubmit={(event) => this.onSubmit(event)}>
          <div className='form-group'>
            <label>Inventory List</label>
            <input
              name='name'
              type='text'
              className='form-control'
              value={name}
              onChange={(event) => this.props.onInputChange(event)}
            />
          </div>
          <div className='form-group'>
            <label>Status</label>
            <select
              className='custom-select'
              name='status'
              value={status}
              onChange={(event) => this.props.onInputChange(event)}
            >
              {this.state.status.map((status) => (
                <option key={status._id} value={JSON.stringify(status)}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label>Description</label>
            <textarea
              name='description'
              type='text'
              className='form-control'
              value={description}
              onChange={(event) => this.props.onInputChange(event)}
            ></textarea>
          </div>
          <div className='form-group'>
            <label>delivery date</label>
            <input
              name='deliveryDate'
              type='time and date'
              className='form-control'
              value={deliveryDate}
              onChange={(event) => this.props.onInputChange(event)}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-primary'>
              {_id ? 'Update' : 'Add'} Inventory
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateInventory;
