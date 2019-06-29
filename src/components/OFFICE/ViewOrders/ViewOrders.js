import React, { Component } from 'react';
import {Container, Loader, Table, Form} from 'semantic-ui-react';
import MenuBar from '../MenuBar/MenuBar';
import axios from 'axios'

const options = [
  { key: 'm', text: 'Ordered', value: 'Ordered' },
  { key: 'f', text: 'Confirmed', value: 'Confirmed' },
  { key: 'o', text: 'Dispatched', value: 'Dispatched' },
]

class ViewOrders extends Component {
  state = { orders: [] }

  componentWillMount() {
    axios.get('https://medikts-backend.herokuapp.com/orders/all')
    .then(response => {
      this.setState({ orders : response.data });
    })
  }

  handleChange = (e, { value, name }) => {
    name.order_status = value
    axios.put(`https://medikts-backend.herokuapp.com/orders/detail/${name.order_id}/`, name)
    .then(response => {
      window.location.reload()
    })
  }

  
  render() { 
    return ( 
    <div>
      <MenuBar />
      <Container className="clinics">
        <h1>View Health Center Orders</h1>
        {this.state.orders.length === 0 && <Loader center inline active={true}>Loading...</Loader>}
          <Table singleLine>
            {this.state.orders.length > 0 && <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Product Code</Table.HeaderCell>
                <Table.HeaderCell>Order Quantity</Table.HeaderCell>
                <Table.HeaderCell>Order Status</Table.HeaderCell>
              </Table.Row>  
            </Table.Header>}

            <Table.Body>
            {this.state.orders.map(item => {
              return (
                <Table.Row>
                  <Table.Cell>{item.product_code}</Table.Cell>
                  <Table.Cell>{item.order_quantity}</Table.Cell>
                  <Table.Cell>
                    <Form.Select onChange={this.handleChange} name={item} fluid options={options} value={item.order_status} />
                  </Table.Cell>
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
 
export default ViewOrders;
