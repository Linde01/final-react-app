import React, { Component } from 'react';

class InventoryList extends Component {
  render() {
    const inventory = this.inventories;
    return (
      <div>
        <h3>inventory List</h3>
        <table className='table'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Inventory List</th>
              <th scope='col'>Description</th>
              <th scope='col'>Status</th>
              <th scope='col'>DeliveryDate</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            
            {inventory && inventory.map((inventory) => (
              <tr key={inventory._id}>
                <th scope='row'>{inventory._id}</th>
                <td onClick={() => this.props.onSelect(inventory)}>
                  {inventory.name}
                </td>
                <td onClick={() => this.props.onSelect(inventory)}>
                  {inventory.status.name}
                </td>
                <td onClick={() => this.props.onSelect(inventory)}>
                  {inventory.description}
                </td>
                <td onClick={() => this.props.onSelect(inventory)}>
                  {inventory.deliveryDate}
                </td>
                <td>
                  <span onClick={() => this.props.onDelete(inventory._id)}>
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

export default InventoryList;
