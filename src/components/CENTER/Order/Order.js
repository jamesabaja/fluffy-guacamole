import React from 'react';
import {Container} from 'semantic-ui-react';
import MenuBar from '../MenuBar/MenuBar';

const Order = () => (
  <div>
    <MenuBar />
    <Container className="clinics">
      <h1>Order Medicines</h1>
    </Container>
  </div>

);

export default Order