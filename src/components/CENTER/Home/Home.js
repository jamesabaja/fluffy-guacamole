import React, { Component } from 'react';
import {Container, Message, Grid} from 'semantic-ui-react';
import MenuBar from '../MenuBar/MenuBar';
import axios from 'axios';

class Dashboard extends Component {
  state = { name: '' , health_center: '', location: ''}
  
  componentWillMount() {
    let firstName = JSON.parse(localStorage.getItem('userDetails'))['first_name'];
    let lastName = JSON.parse(localStorage.getItem('userDetails'))['last_name'];
    this.setState({ name: firstName + " " + lastName });
    if(!localStorage.getItem('centerDetails')) {
      axios.get(`http://localhost:8000/health_center/centers/detail/${JSON.parse(localStorage.getItem('clinicDetails'))['health_center_id']}/`)
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
      </Container>
    </div>
    );
  }
}
 
export default Dashboard;