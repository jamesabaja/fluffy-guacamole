import React from 'react';
import {Container, Icon, Image, Divider} from 'semantic-ui-react';
import james from '../../assets/imgs/james.jpg';
import tine from '../../assets/imgs/tine.jpg';
import jullie from '../../assets/imgs/jullie.jpg';
import brij from '../../assets/imgs/brij.jpg';

const About = () => (
  <Container textAlign="center" className="login">
    <div className="animated slideInUp">
      <Icon name="pills" color="teal" circular inverted size="huge"/>
      <h2><i>The health center dilemma</i></h2>
      <p className="paragraph">Health centers are vital in maintaining and preserving a healthy community. How do these health centers make sure they have a sufficient stock of medicines to cater to the public?</p>

      <h2><i>Rediscover the health center experience.</i></h2>
      <p className="paragraph">MEDIKTS is an inventory tracking system that solves the problem of insufficient stocks in public health centers and can also help patients efficiently track when and where to get their needed medicine.</p>
      <p className="paragraph">The system is composed of various technologies such as web applications, APIs, cloud services, and AI techniques to provide efficient solutions to the health center dilemma.</p>
    </div>
    

    <Divider/>
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