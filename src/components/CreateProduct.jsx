import React, { Component } from 'react';
class CreateProduct extends Component {
  onSubmit(event) {
    event.preventDefault();
    this.props.onCreateProduct();
  }
  render() {
    const {
      id,
      productName,
      category,
      description,
      price,
    } = this.props.product;
    return (
      <div>
        <h3>Product</h3>
        <form onSubmit={(event) => this.onSubmit(event)}>
          <div className='form-group'>
            <label>Product Name</label>
            <input
              name='productName'
              type='text'
              className='form-control'
              value={productName}
              onChange={(event) => this.props.onInputChange(event)}
            />
          </div>
          <div className='form-group'>
            <label>Category</label>
            <input
              name='category'
              type='text'
              className='form-control'
              value={category}
              onChange={(event) => this.props.onInputChange(event)}
            />
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
              {id ? 'Update' : 'Add'} Product
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateProduct;
