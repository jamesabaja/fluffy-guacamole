import React from 'react';
import {Container, Icon, Image, Divider, Grid} from 'semantic-ui-react';
import james from '../../assets/imgs/james.jpg';
import tine from '../../assets/imgs/tine.jpg';
import jullie from '../../assets/imgs/jullie.jpg';
import brij from '../../assets/imgs/brij.jpg';
import MenuBar from '../MenuBar/MenuBar';

const About = () => (
  <div>
    <MenuBar />
    <Container textAlign="center" className="login">
      <div className="animated slideInUp">
        <Icon name="pills" color="teal" circular inverted size="huge"/>
        <h2><i>The health center dilemma</i></h2>
        <p className="paragraph">Health centers are vital in maintaining and preserving a healthy community. How do these health centers make sure they have a sufficient stock of medicines to cater to the public?</p>

        <h2><i>Rediscover the health center experience.</i></h2>
        <p className="paragraph">MEDIKTS is an inventory tracking system that solves the problem of insufficient stocks in public health centers and can also help patients efficiently track when and where to get their needed medicine.</p>
        <p className="paragraph">The system is composed of various technologies such as web applications, APIs, cloud services, and AI techniques to provide efficient solutions to the health center dilemma.</p>
      <Divider/>
      <h1>Meet the Team</h1>
      <Grid columns='four'>
        <Grid.Column>
          <Image src={james} size='small' circular avatar/>
          <br/>
          <h3>James Abaja</h3>
        </Grid.Column>
        <Grid.Column>
          <Image src={tine} size='small' circular avatar/>
          <br/>
          <h3>Kristine Lee</h3>
        </Grid.Column>
        <Grid.Column>
          <Image src={jullie} size='small' circular avatar/>
          <br/>
          <h3>Jullie Reyes</h3>
        </Grid.Column>
        <Grid.Column>
          <Image src={brij} size='small' circular avatar/>
          <br/>
          <h3>Bridget Legaspi</h3>  
        </Grid.Column>
      </Grid>
      </div>
    </Container>
  </div>
);

export default About