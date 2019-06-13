import React from 'react';
import {Container, Message, Grid} from 'semantic-ui-react';
import MenuBar from '../MenuBar/MenuBar';

const OfficeDashboard = () => (
  <div>
    <MenuBar />
    <Container className="clinics">
      <h1>MEDikts City Health Office Module</h1>
      <Grid>
        <Grid.Column width={5}>
          <Message size='small' icon="user" content="Welcome, user."/>
        </Grid.Column>
      </Grid>
    </Container>
  </div>

);

export default OfficeDashboard