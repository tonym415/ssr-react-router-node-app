import React from 'react';


const List = {
  ObjString: (obj) => {
    var return_obj = List.Test(obj) || "Bob" //JSON.stringify(obj, null, 2);
    return(<details><pre>{return_obj}</pre></details>)
  },
  Test: (props) => {
    function traverse(x, level, appendStr) {
      if (isArray(x)) {
        traverseArray(x, level, appendStr);
      } else if ((typeof x === 'object') && (x !== null)) {
        traverseObject(x, level, appendStr);
      } else {
        // console.log(level + x);
        appendStr += level + x  + '\n'
        return "Larry";
      }
    }

    function isArray(o) {
      return Object.prototype.toString.call(o) === '[object Array]';
    }

    function traverseArray(arr, level, appendStr) {
      // console.log(level + "<array>");
      appendStr += level + '<array>\n'
      arr.forEach(function(x) {
        traverse(x, level + "  ", appendStr);
      });
    }

    function traverseObject(obj, level, appendStr) {
      // console.log(level + "<object>");
        appendStr += level + '<object>\n'
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          // console.log(level + "  " + key + ":");
          appendStr += level + "  " + key + ":\n"
          traverse(obj[key], level + "    ", appendStr);
        }
      }
    }
    var str = traverse(props, "", "Mary")
    return str
  },
ListAll: (props) =>{
  const {pokemon, location } = props
  return (
    <div>
      <h3>Total: {pokemon.count}</h3>
        {List.ObjString(pokemon)}
        {pokemon.results.map((poke, idx) => {
        var path = (poke.url.indexOf('pokemon') < 0 ) ? '/ability/' : '/pokemon/';
        return (
          <ul>
            <li key={poke.url}>{idx +1} <a href={path + poke.name}>{poke.name}</a></li>
          </ul>
        )
      })}

    </div>
    )
},
ListAbility: (props) => {
  const {pokemon, location } = props
  const {ability} = location.match.params;

  // console.log(Object.entries(pokemon))
  console.log("Trav: " + List.Test(pokemon))
  const name = pokemon.name.toUpperCase()
  return (
    <div>
      <h3>{name} (Id: {pokemon.id})</h3>
        {List.ObjString(pokemon)}
      Pokemon with ability:
      <ul>
        { pokemon.pokemon.map(poke => {
          const {pokemon} = poke;
          return <li key={pokemon.name}>{pokemon.name}</li>
          })
        }
      </ul>
    </div>
    )
},
ListOne: (props) => {
  const {pokemon, location } = props
  const {pokeID} = location.match.params;
  return (
    <div>
      <h1>{pokemon.name}(id: {pokemon.id})</h1>
        {List.ObjString(pokemon)}
      <h3>Weight: {pokemon.weight}</h3>
      <h3>Height: {pokemon.height}</h3>
               {Object.keys(pokemon.sprites).map((key) => {
                 if (pokemon.sprites[key]) return <img src={pokemon.sprites[key]} alt={key} />
               })}
          <ul>
            <li>Abilities
              <ul>
                { pokemon.abilities.map(a => {
                  const {ability} = a;
                  return <li key={ability.name}>{ability.name}</li>
                  })
                }
              </ul>
            </li>
          </ul>
    </div>
    )
},
ListProps: (props) => {
  const {pokemon, location } = props
  const {id} = location.match.params;

  return (
    <div>
        {List.ObjString(pokemon)}
        { pokemon.map(poke => {
          const {pokemon} = poke;
          return (
            <ul>
              <li key={pokemon.name}><a href={pokemon.location_area_encounters}>{pokemon.location_area_encounters}</a></li>
            </ul>
          )
        })}
    </div>
    )
}
};

export default List;
