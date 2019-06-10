import React from 'react';
import {Container, Icon, Image, Divider} from 'semantic-ui-react';
import james from '../../assets/imgs/james.jpg';
import tine from '../../assets/imgs/tine.jpg';
import jullie from '../../assets/imgs/jullie.jpg';
import brij from '../../assets/imgs/brij.jpg';

const About = () => (
  <Container textAlign="center" className="login">
    <Icon name="pills" color="teal" circular inverted size="huge"/>
    <h1>About the System</h1>
    <h4>Medicine Inventory Keeping and Tracking System</h4>
    <Divider />
    <h1>Meet the Team</h1>   
    <Image.Group size="small">
      <Image src={james} size='medium' circular />
      <Image src={tine} size='medium' circular />
      <Image src={jullie} size='medium' circular />
      <Image src={brij} size='medium' circular />
    </Image.Group>
  </Container>
);

export default About