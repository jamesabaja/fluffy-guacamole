import React from 'react';
import "./App.css";
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import MenuBar from './components/MenuBar/MenuBar';
import About from './components/About/About';
import Login from './components/Login/Login';

const App = () => {
  return (
    <div>
      <MenuBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
    
  );
}

export default App;
