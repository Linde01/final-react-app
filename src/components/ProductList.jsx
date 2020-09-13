import React, { Component } from 'react';

class ProductList extends Component {
  render() {
    const products = this.props.products;
    return (
      <div>
        <h3>Product List</h3>
        <table className='table'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Product Name</th>
              <th scope='col'>Category</th>
              <th scope='col'>Description</th>
              <th scope='col'>Price</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <th scope='row'>{product._id}</th>
                <td onClick={() => this.props.onSelect(product)}>
                  {product.name}
                </td>
                <td onClick={() => this.props.onSelect(product)}>
                  {product.category.name}
                </td>
                <td onClick={() => this.props.onSelect(product)}>
                  {product.description}
                </td>
                <td onClick={() => this.props.onSelect(product)}>
                  {product.price}
                </td>
                <td>
                  <span onClick={() => this.props.onDelete(product._id)}>
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProductList;
