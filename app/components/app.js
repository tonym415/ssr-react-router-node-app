import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import ListOptions from './List'
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
            <Route path="/pokemon" exact render={(location) => (<ListOptions.ListAll pokemon={pokemon} location={location} />)} />
            <Route path="/ability" exact render={(location) => (<ListOptions.ListAll pokemon={pokemon} location={location} />)} />
            <Route path="/pokemon/:pokemon" render={(location) => (<ListOptions.ListOne pokemon={pokemon} location={location} />)} />
            <Route path="/ability/:ability" render={(location) => (<ListOptions.ListAbility pokemon={pokemon} location={location} />)} />
        </Switch>
    </div>
  )
};
