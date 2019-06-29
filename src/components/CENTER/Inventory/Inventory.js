import React, { Component } from 'react';
import {Container, Table, Button, Modal, Form, Loader} from 'semantic-ui-react';
import MenuBar from '../MenuBar/MenuBar';
import axios from 'axios';

// const data = [{
//   'product_code': '12345',
//   'product_name': 'Centrum',
//   'current_quantity': '3',
//   'starting_quantity': '4'
// }, {
//   'product_code': '67890',
//   'product_name': 'Poten Cee',
//   'current_quantity': '1',
//   'starting_quantity': '4'
// }]

class Inventory extends Component {
  state = { inventory: [], modalOpen: false, item: {
    product_code: '',
    product_name: '',
    current_quantity: 0,
    starting_quantity: 1
  }, orderModalOpen: false }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    axios.get('https://medikts-backend.herokuapp.com/inventory/all')
    .then(response => {
      this.setState({ inventory : response.data });
    })
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
      this.props.history.push('/clinics/order')
    })
  } 

  onChange = (event) => {
    let value=event.target.value;
    let item = this.state.item;
    item.current_quantity = value;
    this.setState({ item : item });
  }

  render() { 
    return ( 
    <div>
      <MenuBar />
      <Container className="clinics">
        <h1>Inventory</h1>
        {this.state.inventory.length === 0 && <Loader center inline active={true}>Loading...</Loader>}
        <Table singleLine>
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
                  trigger={<Button color='red' onClick={() => this.orderMeds(item)}>ORDER NOW</Button>}
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
        </Table>
      </Container>
    </div>
    );
  }
}
 
export default Inventory;