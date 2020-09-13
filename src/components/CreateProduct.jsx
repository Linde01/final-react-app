import React, { Component } from 'react';
import axios from 'axios';

const mapper = (data) => {
  const { description, __v, ...otherProp } = data;
  return otherProp;
};
class CreateProduct extends Component {
  state = {
    categories: [],
  };
  async componentDidMount() {
    const response = await axios.get('http://localhost:3001/api/categories');
    this.setState({ categories: response.data.map(mapper) });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.onCreateProduct();
  }
  render() {
    const { _id, name, category, description, price } = this.props.product;
    return (
      <div>
        <h3>Product</h3>
        <form onSubmit={(event) => this.onSubmit(event)}>
          <div className='form-group'>
            <label>Product Name</label>
            <input
              name='name'
              type='text'
              className='form-control'
              value={name}
              onChange={(event) => this.props.onInputChange(event)}
            />
          </div>
          <div className='form-group'>
            <label>Category</label>
            <select
              className='custom-select'
              name='category'
              value={category}
              onChange={(event) => this.props.onInputChange(event)}
            >
              {this.state.categories.map((category) => (
                <option key={category._id} value={JSON.stringify(category)}>
                  {category.name}
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
            <label>Price</label>
            <input
              name='price'
              type='number'
              className='form-control'
              value={price}
              onChange={(event) => this.props.onInputChange(event)}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-primary'>
              {_id ? 'Update' : 'Add'} Product
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateProduct;
