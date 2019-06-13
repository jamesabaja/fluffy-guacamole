import React from 'react';
import "./App.css";
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import Login from './components/Login/Login';
import Dashboard from './components/CENTER/Home/Home';
import Inventory from './components/CENTER/Inventory/Inventory';
import Order from './components/CENTER/Order/Order';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/clinics" component={Dashboard} />
        <Route exact path="/clinics/inventory" component={Inventory} />
        <Route exact path="/clinics/order" component={Order} />
      </Switch>
    </div>
    
  );
}

export default App;
