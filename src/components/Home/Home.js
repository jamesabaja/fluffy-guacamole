import React from 'react';
import {Container, Icon} from 'semantic-ui-react';

const Home = () => (
  <Container textAlign="center" className="login">
    <div className="animated fadeIn">
      <Icon name="pills" color="teal" circular inverted size="huge"/>
      <h1>MEDikts</h1>
      <h4>Medicine Inventory Keeping and Tracking System</h4>
    </div>
  </Container>
);

export default Home