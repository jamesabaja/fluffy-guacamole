import React, { Component } from 'react';
import {Container, Message, Grid} from 'semantic-ui-react';
import MenuBar from '../MenuBar/MenuBar';
import axios from 'axios';

class OfficeDashboard extends Component {
  state = { name: '', office: '' }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    let firstName = JSON.parse(localStorage.getItem('userDetails'))['first_name'];
    let lastName = JSON.parse(localStorage.getItem('userDetails'))['last_name'];
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
      </Container>
    </div>
    );
  }
}
 
export default OfficeDashboard;
