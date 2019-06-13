import React from 'react';
import {Container, Message, Grid} from 'semantic-ui-react';
import MenuBar from '../MenuBar/MenuBar';

const Dashboard = () => (
  <div>
    <MenuBar />
    <Container className="clinics">
      <h1>MEDikts Health Center Module</h1>
      <Grid>
        <Grid.Column width={5}>
          <Message size='small' icon="user md" content="Welcome, user."/>
        </Grid.Column>
      </Grid>
    </Container>
  </div>

);

export default Dashboard