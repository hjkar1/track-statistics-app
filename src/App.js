import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import TrackData from './components/TrackData';
import Login from './components/Login';

const App = () => (
  <Switch>
    <Route exact path="/" component={TrackData} />
    <Route exact path="/authorize" component={Login} />
  </Switch>
);

export default App;
