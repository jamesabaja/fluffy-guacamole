import React, { Component } from 'react';
import {Container, Message, Grid, Loader, Table, Form} from 'semantic-ui-react';
import MenuBar from '../MenuBar/MenuBar';
import axios from 'axios';

const options = [
  { key: 'm', text: 'Ordered', value: 'Ordered' },
  { key: 'f', text: 'Confirmed', value: 'Confirmed' },
  { key: 'o', text: 'Dispatched', value: 'Dispatched' },
]

class OfficeDashboard extends Component {
  state = { name: '', office: '', orders: [], orderIsLoading: false }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    let firstName = JSON.parse(localStorage.getItem('userDetails'))['first_name'];
    let lastName = JSON.parse(localStorage.getItem('userDetails'))['last_name'];
    this.setState({ orderIsLoading : true });
    axios.get('https://medikts-backend.herokuapp.com/orders/all')
    .then(response => {
      this.setState({ orders : response.data, orderIsLoading: false });
    })
    this.setState({ name: firstName + " " + lastName });
    if(!localStorage.getItem('cityDetails')) {
      axios.get(`https://medikts-backend.herokuapp.com/city_office/offices/detail/${JSON.parse(localStorage.getItem('officeDetails'))['city_office_id']}/`)
      .then(response => {
        localStorage.setItem('cityDetails', JSON.stringify(response.data));
        this.setState({ 
          office: response.data.city_office_name
        });
      })
    }else {
      this.setState({ 
        office: JSON.parse(localStorage.getItem('cityDetails'))['city_office_name'],
      });
    }
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
        <h1>MEDikts City Health Office Module</h1>
        <Grid>
          <Grid.Column width={5}>
            <Message 
            size='small'
            icon="user" 
            header={`Welcome, ${this.state.name}.`}
            content={this.state.office}/>
          </Grid.Column>
        </Grid>
        <h1>View Health Center Orders</h1>
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
                    <Form.Select onChange={this.handleChange} name={item} fluid options={options} value={item.order_status} />
                  </Table.Cell>
              </Table.Row>
              ) 
            })}  
            </Table.Body>      
          </Table>}
      </Container>
    </div>
    );
  }
}
 
export default OfficeDashboard;
