import React, { Component } from 'react';
import {Container, Message, Grid, Loader, Table, Modal, Form, Button, Step} from 'semantic-ui-react';
import MenuBar from '../MenuBar/MenuBar';
import axios from 'axios';

class Dashboard extends Component {
  state = { name: '' , health_center: '', location: '', inventory: [], modalOpen: false, item: {
    product_code: '',
    product_name: '',
    current_quantity: 0,
    starting_quantity: 1
  }, orderModalOpen: false, orders: [], orderIsLoading: false, inventoryIsLoading: false}
  
  componentWillMount() {
    this.setState({inventoryIsLoading: true, orderIsLoading: true})
    axios.get('https://medikts-backend.herokuapp.com/inventory/all')
    .then(response => {
      this.setState({ inventory : response.data, inventoryIsLoading: false });
    })
    axios.get('https://medikts-backend.herokuapp.com/orders/all')
    .then(response => {
      this.setState({ orders : response.data, orderIsLoading: false });
    })
    let firstName = JSON.parse(localStorage.getItem('userDetails'))['first_name'];
    let lastName = JSON.parse(localStorage.getItem('userDetails'))['last_name'];
    this.setState({ name: firstName + " " + lastName });
    if(!localStorage.getItem('centerDetails')) {
      axios.get(`https://medikts-backend.herokuapp.com/health_center/centers/detail/${JSON.parse(localStorage.getItem('clinicDetails'))['health_center_id']}/`)
      .then(response => {
        localStorage.setItem('centerDetails', JSON.stringify(response.data));
        this.setState({ 
          health_center: response.data.health_center_name,
          location: response.data.health_center_location
        });
      })
    }else {
      this.setState({ 
        health_center: JSON.parse(localStorage.getItem('centerDetails'))['health_center_name'],
        location: JSON.parse(localStorage.getItem('centerDetails'))['health_center_location']
      });
    }
  }

  updateStocks = () => {
    axios.put(`https://medikts-backend.herokuapp.com/inventory/detail/${this.state.item.inventory_id}/`, this.state.item)
    .then(response => [
      window.location.reload()
    ])
  }

  toggleModal = () => {
    this.setState({ modalOpen : !this.state.modalOpen });
    window.location.reload()
  }

  toggleOrderModal = () => {
    this.setState({ orderModalOpen : !this.state.orderModalOpen});
  }

  setActiveItem = (item) => {
    this.setState({ item : item, modalOpen : true });
  }

  orderMeds = (item) => {
    this.setState({ orderModalOpen : true });
    console.log(item.inventory_id);
    axios.post('https://medikts-backend.herokuapp.com/orders/all', {
      health_center_id: 1,
      city_office_id: 1,
      product_code: item.inventory_id,
      order_quantity: item.starting_quantity - item.current_quantity,
      order_status: 'Ordered'
    })
    .then(response => {
      console.log(response.data);
      window.location.reload()
    })
  } 

  onChange = (event) => {
    let value=event.target.value;
    let item = this.state.item;
    item.current_quantity = value;
    this.setState({ item : item });
  }

  receiveOrder = (item) => {
    axios.get('https://medikts-backend.herokuapp.com/inventory/all')
    .then(response => {
      console.log('done1')
      response.data.map(inv => {
        console.log(item, inv)
        if(item.product_code === inv.inventory_id) {
          inv.current_quantity += item.order_quantity;
          console.log(inv)
          axios.put(`https://medikts-backend.herokuapp.com/inventory/detail/${inv.inventory_id}/`, inv)
          .then(response => {
            console.log('done2')
            axios.delete(`https://medikts-backend.herokuapp.com/orders/detail/${item.order_id}/`)
            .then(response => {
              window.location.reload()
            })
          })
        }
      })
    })
  }

  checkIfOK = (code) => {
    let returnValue = false;
    this.state.orders.map(item => {
      if(item.product_code === code) {
        returnValue = true;
      }
    })
    return returnValue;
  }
  
  render() { 
    return ( 
    <div>
      <MenuBar />
      <Container className="clinics">
        <h1>MEDikts Health Center Module</h1>
        <Grid>
          <Grid.Column width={5}>
            <Message 
              size='small' 
              icon="user md"
              header={`Welcome, ${this.state.name}`}
              content={`${this.state.health_center}, ${this.state.location}`}
            />
          </Grid.Column>
        </Grid>
        <h1>View Your Orders</h1>
          {this.state.orders.length === 0 && !this.state.orderIsLoading && <p>No current active orders.</p>}
          {this.state.orderIsLoading && <Loader center inline active={true}>Loading...</Loader>}
          {this.state.orders.length > 0 && <Table singleLine>
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
          </Table>}
        <h1>Inventory</h1>
        {this.state.inventoryIsLoading && <Loader center inline active={true}>Loading...</Loader>}
        {this.state.inventory.length > 0 && <Table singleLine>
          {this.state.inventory.length > 0 && <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Product Code</Table.HeaderCell>
              <Table.HeaderCell>Product Name</Table.HeaderCell>
              <Table.HeaderCell>Current Quantity</Table.HeaderCell>
              <Table.HeaderCell>Critical</Table.HeaderCell>
            </Table.Row>  
          </Table.Header>}

          <Table.Body>
          {this.state.inventory.map(item => {
            const percent = item.current_quantity/item.starting_quantity;
            return (
              <Table.Row>
                <Table.Cell>{item.product_code}</Table.Cell>
                <Table.Cell>{item.product_name}</Table.Cell>
                <Table.Cell>{item.current_quantity} / {item.starting_quantity}</Table.Cell>
                <Table.Cell>{percent <= 0.40 ?
                <Modal
                  trigger={<Button color='red' disabled={this.checkIfOK(item.inventory_id)} onClick={() => this.orderMeds(item)}>{this.checkIfOK(item.product_code) ? 'ORDERED' : 'ORDER NOW'}</Button>}
                  open={this.state.orderModalOpen}
                  onClose={this.toggleOrderModal}
                  size='small'
                >
                  <Modal.Content>
                    Sending request to city health office, please wait... 
                  </Modal.Content>
                </Modal> 
                : 
                <Modal
                  trigger={<Button color='teal' onClick={() => this.setActiveItem(item)}>Update stocks</Button>}
                  open={this.state.modalOpen}
                  onClose={this.toggleModal}
                  size='small'
                >
                  <Modal.Content>
                    <Form>
                        <Form.Input label='Product Code' value={this.state.item.product_code} disabled/>
                        <Form.Input label='Product Name' value={this.state.item.product_name} disabled/>
                        <Form.Input label='Current Quantity' value={this.state.item.current_quantity} onChange={this.onChange}/>
                        <Form.Input label='Starting Quantity' value={this.state.item.starting_quantity} disabled/>
                    </Form>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color='green' onClick={this.updateStocks}>
                      Update Stock
                    </Button>
                  </Modal.Actions>
                </Modal>
              }
              </Table.Cell>
            </Table.Row>
            ) 
          })}  
          </Table.Body>      
        </Table>}
        <br/>
      </Container>
    </div>
    );
  }
}
 
export default Dashboard;