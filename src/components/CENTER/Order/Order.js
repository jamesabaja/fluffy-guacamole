import React, { Component } from 'react';
import {Container, Step, Loader, Table, Button} from 'semantic-ui-react';
import MenuBar from '../MenuBar/MenuBar';
import axios from 'axios';

class Order extends Component {
  state = { orders: [] }

  componentWillMount() {
    axios.get('http://localhost:8000/orders/all')
    .then(response => {
      this.setState({ orders : response.data });
    })
  }

  receiveOrder = (item) => {
    axios.get('http://localhost:8000/inventory/all')
    .then(response => {
      console.log('done1')
      response.data.map(inv => {
        console.log(item, inv)
        if(item.product_code === inv.inventory_id) {
          inv.current_quantity += item.order_quantity;
          console.log(inv)
          axios.put(`http://localhost:8000/inventory/detail/${inv.inventory_id}/`, inv)
          .then(response => {
            console.log('done2')
            axios.delete(`http://localhost:8000/orders/detail/${item.order_id}/`)
            .then(response => {
              this.props.history.push('/clinics/inventory')
            })
          })
        }
      })
    })
  }

  render() { 
    return ( 
      <div>
        <MenuBar />
        <Container className="clinics">
          <h1>View Your Orders</h1>
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
                    <Step.Group ordered>
                      <Step completed>
                        <Step.Content>
                          <Step.Title>Ordered</Step.Title>
                        </Step.Content>
                      </Step>

                      <Step completed={item.order_status === 'Confirmed' || item.order_status === 'Dispatched' ? true : false}>
                        <Step.Content>
                          <Step.Title>Confirmed</Step.Title>
                        </Step.Content>
                      </Step>

                      <Step completed={item.order_status === 'Dispatched' ? true : false}>
                        <Step.Content>
                          <Step.Title>Dispatched</Step.Title>
                        </Step.Content>
                      </Step>
                      <Step>
                        <Step.Content>
                          {/* <Step.Title>Received</Step.Title> */}
                          <Step.Description>
                          {item.order_status === 'Dispatched' ? <Button color='teal' onClick={() => this.receiveOrder(item)}>Receive Order</Button> : 'Received'}
                          </Step.Description>
                        </Step.Content>
                      </Step>
                    </Step.Group>
                    
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
 
export default Order;
