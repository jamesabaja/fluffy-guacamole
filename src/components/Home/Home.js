import React from 'react';
import {Container, Icon} from 'semantic-ui-react';
import MenuBar from '../MenuBar/MenuBar';

const Home = () => (
  <div>
    <MenuBar />
    <Container textAlign="center" className="login">
      <div className="animated fadeIn">
        <Icon name="pills" color="teal" circular inverted size="huge"/>
        <h1>MEDikts</h1>
        <h4>Medicine Inventory Keeping and Tracking System</h4>
      </div>
    </Container>
  </div>
  
);

export default Home