import React from 'react';
import {Container, Icon, Input, Card, Button} from 'semantic-ui-react';
import MenuBar from '../MenuBar/MenuBar';

const Login = () => (
  <div>
    <MenuBar />
    <Container textAlign="center" className="login">
      <Icon name="pills" color="teal" circular inverted size="huge"/>
      <h1>MEDikts</h1>
      <h4>Medicine Inventory Keeping and Tracking System</h4>
      <br/>
      <Card centered>
        <Card.Content>
          <Input icon='users' iconPosition='left' placeholder='Username' />
          <br/>
          <br/> 
          <Input icon='key' iconPosition='left' placeholder='Password' />   
        </Card.Content> 
        <Card.Content extra>
          <Button href='/clinics' fluid color='green'>
            Login
          </Button>
        </Card.Content>
      </Card>
    </Container>
  </div>
    
);

export default Login