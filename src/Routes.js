import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import Productlist from './pages/Productlist';
import RecentList from './pages/RecentList';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/recentList" component={RecentList} />
          <Route exact path="/product" component={Productlist} />
          <Route exact path="/product/:id" component={ProductDetail} />
        </Switch>
      </Router>
    );
  }
}
