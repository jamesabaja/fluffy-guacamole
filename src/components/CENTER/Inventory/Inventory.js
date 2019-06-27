import React, { Component } from 'react';
import {Container, Table} from 'semantic-ui-react';
import MenuBar from '../MenuBar/MenuBar';

const data = [{
  'product_code': '12345',
  'product_name': 'Centrum',
  'current_quantity': '3',
  'starting_quantity': '4'
}, {
  'product_code': '67890',
  'product_name': 'Poten Cee',
  'current_quantity': '1',
  'starting_quantity': '4'
}]

class Inventory extends Component {
  state = {  }
  render() { 
    return ( 
    <div>
      <MenuBar />
      <Container className="clinics">
        <h1>Inventory</h1>
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Product Code</Table.HeaderCell>
              <Table.HeaderCell>Product Name</Table.HeaderCell>
              <Table.HeaderCell>Current Quantity</Table.HeaderCell>
            </Table.Row>  
          </Table.Header>

          <Table.Body>
          {data.map(item => {
            return (
              <Table.Row>
                <Table.Cell>{item.product_code}</Table.Cell>
                <Table.Cell>{item.product_name}</Table.Cell>
                <Table.Cell>{item.current_quantity} / {item.starting_quantity}</Table.Cell>
              </Table.Row>
            ) 
          })}  
          </Table.Body>      
        </Table>
      </Container>
    </div>
    );
  }
}
 
export default Inventory;