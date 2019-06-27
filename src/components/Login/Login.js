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
    localStorage.setItem('isAuthenticatedClinic', null);
    localStorage.setItem('isAuthenticatedOffice', null);
  }

  onChange = (event, data) => {
    this.setState({[event.target.name]: event.target.value});
  }

  logIn = () => {
    this.setState({ isLoading : true });
    axios.post('http://localhost:8000/login/', this.state)
    .then(response => {
      localStorage.setItem('userDetails', JSON.stringify(response.data));
      axios.get(`http://localhost:8000/health_center/staff/detail/${this.state.username}/`)
      .then(response => {
        localStorage.setItem('clinicDetails', JSON.stringify(response.data));
        localStorage.setItem('isAuthenticatedClinic', 'true');
        this.props.history.push('/clinics');     
      }).catch(error => {
        axios.get(`http://localhost:8000/city_office/staff/detail/${this.state.username}/`)
        .then(response => {
          localStorage.setItem('officeDetails', JSON.stringify(response.data));
          localStorage.setItem('isAuthenticatedOffice', 'true');
          this.props.history.push('/office');     
        })
      })
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