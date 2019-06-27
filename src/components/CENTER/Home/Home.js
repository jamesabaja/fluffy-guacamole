import React, { Component } from 'react';
import {Container, Message, Grid} from 'semantic-ui-react';
import MenuBar from '../MenuBar/MenuBar';

class Dashboard extends Component {
  state = { name: '' }
  
  componentWillMount() {
    let firstName = JSON.parse(localStorage.getItem('userDetails'))['first_name'];
    let lastName = JSON.parse(localStorage.getItem('userDetails'))['last_name'];
    this.setState({ name: firstName + " " + lastName });
  }
  
  render() { 
    return ( 
    <div>
      <MenuBar />
      <Container className="clinics">
        <h1>MEDikts Health Center Module</h1>
        <Grid>
          <Grid.Column width={5}>
            <Message size='small' icon="user md" content={`Welcome, ${this.state.name}.`}/>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
    );
  }
}
 
export default Dashboard;