import request from 'axios';

const getPokemon = {
  init: (constr) => {
    // console.log("init service")
    // console.log(constr)

    switch (constr.service){
      case 'ability':
        var baseUrl = "http://pokeapi.co/api/v2/ability";
        break;
      case 'pokemon':
        var baseUrl = "http://pokeapi.co/api/v2/pokemon";
        break;
      default:
        var baseUrl = "http://pokeapi.co/api/v2";
        break;
    }

    var req = `${baseUrl}/${constr.value}/?limit=10`
    console.log("Request: " + req)
    return request.get(req)
  }
};

export default getPokemon;
