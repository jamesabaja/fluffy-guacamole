import React from 'react';
import {Container} from 'semantic-ui-react';
import MenuBar from '../MenuBar/MenuBar';

const Inventory = () => (
  <div>
    <MenuBar />
    <Container className="clinics">
      <h1>Inventory</h1>
    </Container>
  </div>

);

export default Inventory