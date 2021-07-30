import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Product from './pages/Product';
import RecentList from './pages/RecentList';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/recentList' component={RecentList} />
          <Route exact path='/product' component={Product} />
        </Switch>
      </Router>
    );
  }
}
