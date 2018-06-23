import { renderToString } from 'react-dom/server'
import React from 'react';
import { matchPath, StaticRouter } from 'react-router-dom';

import routes from './routes';
import renderFullPage from './renderFullPage';
import getPokemon from '../services/getPokemon';
import App from '../components/App';

export default function router(req, res) {
  const match = routes.reduce((acc, route) => matchPath(req.url, { path: route, exact: true }) || acc, null);
  //console.dir(match)
  var director = {};
  if (!match) {
    res.status(404).send('What\'s really good!?!?!?!?!');
    return;
  }else{
    var p = match.params;
    // console.log(Object.keys(p))
    if (Object.keys(p).length > 0 ){
      if (Object.keys(p).indexOf('ability') >= 0){
          director.service = "ability";
          director.value = p["ability"]
      }else if (Object.keys(p).indexOf('pokemon') >= 0){
          director.service = "pokemon";
          director.value = p["pokemon"] || 1  //default id
      }else{
          director.service = "search";
          director.value = p["ability"] || "ability"  //default id
      }
    }else{
      director.service = 'search'
      director.value = match.url.split()[0].replace(/\//g,'');
      // director.value = match.url.replace(/\//g,'');

    }
  }
  return getPokemon.init(director)
    .then(resp => {
      const pokemon = resp.data;
      const context = {}

      const html = renderToString(
        <StaticRouter context={context} location={req.url}>
          <App pokemon={pokemon}/>
        </StaticRouter>
      )

      res.status(200).send(renderFullPage(html, pokemon));
    })
    .catch(err => res.status(404).send(`${err}: Oh No! I connot find the telepathic son of a #$#%$...maybe they knew we were coming!`));

};
