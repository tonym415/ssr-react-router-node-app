import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import List from './List'
import Home from './Home'
export default function App(props) {
  const { pokemon } = props;
  const style = 'ul { list-style: none}'
  return (
    <div>
    <style>{style}</style>
        Your React Node is Ballin!
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/pokemon" exact render={(location) => (<List pokemon={pokemon} location={location} />)} />
            <Route path="/ability" exact render={(location) => (<List pokemon={pokemon} location={location} />)} />
            <Route path="/pokemon/:pokemon" render={(location) => (<List pokemon={pokemon} location={location} />)} />
            <Route path="/ability/:ability" render={(location) => (<List pokemon={pokemon} location={location} />)} />
        </Switch>
    </div>
  )
};
