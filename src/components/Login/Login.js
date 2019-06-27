import React, {Component} from 'react';
import {Container, Icon, Input, Card, Button, Loader} from 'semantic-ui-react';
import MenuBar from '../MenuBar/MenuBar';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false
    }
  }

  componentWillMount() {
    localStorage.setItem('token', null);
    localStorage.setItem('isAuthenticated', null);
  }

  onChange = (event, data) => {
    this.setState({[event.target.name]: event.target.value});
  }

  logIn = () => {
    this.setState({ isLoading : true });
    axios.post('http://localhost:8000/login/', this.state)
    .then(response => {
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userDetails', JSON.stringify(response.data));
      this.props.history.push('/clinics');          
    }).catch(error => {
      this.setState({ isLoading : false });
    });
  }

  render() {
    return (
      <div>
        <MenuBar />
        <Container textAlign="center" className="login">
          <Icon name="pills" color="teal" circular inverted size="huge"/>
          <h1>MEDikts</h1>
          <h4>Medicine Inventory Keeping and Tracking System</h4>
          <Loader center inline active={this.state.isLoading}>Loading...</Loader>
          <br/>
          <Loader inline active={this.state.isLoading}>Verifying credentials...</Loader>
          {this.state.isLoading ? null : <br/>}
          <Card centered>
            <Card.Content>
              <Input icon='users' name='username' iconPosition='left' placeholder='Username' onChange={this.onChange}/>
              <br/>
              <br/> 
              <Input type='password' name='password' icon='key' iconPosition='left' placeholder='Password' onChange={this.onChange} />   
            </Card.Content> 
            <Card.Content extra>
              <Button onClick={this.logIn} fluid color='green'>
                Login
              </Button>
            </Card.Content>
          </Card>
        </Container>
      </div>
    )
  }
}

export default Login