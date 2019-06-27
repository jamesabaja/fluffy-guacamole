import React from 'react';
import "./App.css";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import Login from './components/Login/Login';
import Dashboard from './components/CENTER/Home/Home';
import Inventory from './components/CENTER/Inventory/Inventory';
import Order from './components/CENTER/Order/Order';
import ViewOrders from './components/OFFICE/ViewOrders/ViewOrders';
import OfficeDashboard from './components/OFFICE/OfficeDashboard/Dashboard';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        {localStorage.getItem('isAuthenticated') === 'true' ?
        <div>
          <Route exact path="/clinics" component={Dashboard} />
          <Route exact path="/clinics/inventory" component={Inventory} />
          <Route exact path="/clinics/order" component={Order} />
        </div>
        :
        <Redirect to='/login' />}
        <Route exact path="/office" component={OfficeDashboard} />
        <Route exact path="/office/view/orders" component={ViewOrders} />
        {/* <Route exact path="/office/view/health_centers" component={ViewOrders} /> */}
      </Switch>
    </div>
    
  );
}

export default withRouter(App);
