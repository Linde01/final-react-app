import React, { Component } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import CreateProduct from './CreateProduct';

const stateClearData = {
  _id: 0,
  name: '',
  category: {},
  description: '',
  price: '',
};

class App extends Component {
  state = {
    products: [],
    form: {
      _id: 0,
      name: '',
      category: {},
      description: '',
      price: '',
    },
  };

  async componentDidMount() {
    const response = await axios.get('http://localhost:3001/api/products');
    this.setState({ products: response.data });
  }

  async onUpdateProduct() {
    const { products: previousProducts, form } = this.state;
    const productToUpdate = {
      name: form.name,
      categoryId: JSON.parse(form.category)._id,
      price: form.price,
    };
    await axios.put(
      `http://localhost:3001/api/products/${form._id}`,
      productToUpdate
    );
    const products = previousProducts.map((product) => {
      if (product._id === form._id) {
        product.name = form.name;
        product.category = JSON.parse(form.category);
        product.price = form.price;
      }
      return product;
    });
    this.setState({ products, form: { ...stateClearData } });
  }

  async onCreateProduct() {
    const { products, form } = this.state;
    if (form._id) {
      this.onUpdateProduct();
      return;
    }
    const newProduct = {
      name: form.name,
      categoryId: JSON.parse(form.category)._id,
      price: form.price,
    };
    const { data } = await axios.post(
      'http://localhost:3001/api/products',
      newProduct
    );
    this.setState({
      products: [...products, data],
      form: { ...stateClearData },
    });
  }

  async onDeleteProduct(productId) {
    const { products: previousProducts } = this.state;
    await axios.delete(`http://localhost:3001/api/products/${productId}`);
    const products = previousProducts.filter(
      (product) => product._id !== productId
    );
    this.setState({ products });
  }

  onInputChange(event) {
    const form = { ...this.state.form };
    form[event.currentTarget.name] = event.currentTarget.value;
    this.setState({ form });
  }

  onSelectProduct(product) {
    const category = JSON.stringify(product.category);
    this.setState({ form: { ...product, category } });
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <CreateProduct
              product={this.state.form}
              onCreateProduct={(product) => this.onCreateProduct(product)}
              onInputChange={(event) => this.onInputChange(event)}
            />
          </div>
          <div className='col-md-8'>
            <ProductList
              products={this.state.products}
              onDelete={(productId) => this.onDeleteProduct(productId)}
              onSelect={(product) => this.onSelectProduct(product)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
