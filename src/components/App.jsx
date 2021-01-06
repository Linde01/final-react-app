import React, { Component } from 'react';
import axios from 'axios';
import InventoryList from './InventoryList';
import CreateInventory from './CreateInventory';

const stateClearData = {
  _id: 0,
  name: '',
  description: '',
  status: {},
  deliveryDate: '',
};

class App extends Component {
  state = {
    inventories: [],
    form: {
      _id: 0,
      name: '',
      description: '',
      status: {},
      deliveryDate: '',
    },
  };

  async componentDidMount() {
    const response = await axios.get('http://localhost:3001/api/inventories');
    this.setState({ inventories: response.data });
  }

  async onUpdateInventory() {
    const { inventories: previousInventories, form } = this.state;
    const inventoryToUpdate = {
      name: form.name,
      statusId: JSON.parse(form.status)._id,
      deliveryDate: form.deliveryDate,
    };
    await axios.put(
      `http://localhost:3001/api/inventories/${form._id}`,
      inventoryToUpdate
    );
    const inventories = previousInventories.map((inventory) => {
      if (inventory._id === form._id) {
        inventory.name = form.name;
        inventory.status = JSON.parse(form.status);
        inventory.deliveryDate = form.deliveryDate;
      }
      return inventory;
    });
    this.setState({ inventories, form: { ...stateClearData } });
  }

  async onCreateInventory() {
    const { inventories, form } = this.state;
    if (form._id) {
      this.onUpdateInventory();
      return;
    }
    const newInventory = {
      name: form.name,
      statusId: JSON.parse(form.status)._id,
      deliveryDate: form.deliveryDate,
  
    };
    const { data } = await axios.post(
      'http://localhost:3001/api/inventories',
      newInventory
    );
    this.setState({
      inventories: [...inventories, data],
      form: { ...stateClearData },
    });
  }

  async onDeleteInventory(inventoryId) {
    const { inventories: previousInventories } = this.state;
    await axios.delete(`http://localhost:3001/api/inventories/${inventoryId}`);
    const inventories = previousInventories.filter(
      (inventory) => inventory._id !== inventoryId
    );
    this.setState({ inventories });
  }

  onInputChange(event) {
    const form = { ...this.state.form };
    form[event.currentTarget.name] = event.currentTarget.value;
    this.setState({ form });
  }

  onSelectInventory(inventory) {
    const status = JSON.stringify(inventory.status);
    this.setState({ form: { ...inventory, status } });
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <CreateInventory
              inventory={this.state.form}
              onCreateInventory={(inventory) => this.onCreateInventory(inventory)}
              onInputChange={(event) => this.onInputChange(event)}
            />
          </div>
          <div className='col-md-8'>
            <InventoryList
              inventories={this.state.inventories}
              onDelete={(inventoryId) => this.onDeleteInventory(inventoryId)}
              onSelect={(inventory) => this.onSelectInventory(inventory)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
