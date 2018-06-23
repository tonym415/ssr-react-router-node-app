import React from 'react';

const Schemas = {
   toString: (props) => {
    var tObj
    // tObj = Schemas.scan(props)
    console.log(tObj)
    var return_obj = tObj || JSON.stringify(props, null, 1);
    return(<details><pre>{return_obj}</pre></details>)
  },
  scan:(props) => {
    function traverse(x, level, appendStr) {
      if (isArray(x)) {
        traverseArray(x, level, appendStr);
      } else if ((typeof x === 'object') && (x !== null)) {
        traverseObject(x, level, appendStr);
      } else {
        console.log(level + x);
        appendStr += level + x  + '\n'
        return "Larry";
      }
    }

    function isArray(o) {
      return Object.prototype.toString.call(o) === '[object Array]';
    }

    function traverseArray(arr, level, appendStr) {
      console.log(level + "<array>");
      appendStr += level + '<array>\n'
      arr.forEach(function(x) {
        traverse(x, level + "  ", appendStr);
      });
    }

    function traverseObject(obj, level, appendStr) {
      console.log(level + "<object>");
        appendStr += level + '<object>\n'
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          console.log(level + "  " + key + ":");
          appendStr += level + "  " + key + ":\n"
          traverse(obj[key], level + "    ", appendStr);
        }
      }
    }
     return traverse(props, "", "Mary")
  },
  listAll: (props) => {
    const {pokemon, location } = props
      return (
        <div>
          <h3>Total: {pokemon.count}</h3>
            { Schemas.toString(pokemon)}
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
  listAbility: (props) => {
    const {pokemon, location } = props
    const {ability} = location.match.params;

    // console.log(Object.entries(pokemon))
    // console.log("Trav: " +  Test(pokemon))
    const name = pokemon.name.toUpperCase()
    return (
      <div>
        <h3>{name} (Id: {pokemon.id})</h3>
        <h5>Generation: {pokemon.generation.name}</h5>
          {  Schemas.toString(pokemon)}
        Pokemon with ability:
        <ul>
          { pokemon.pokemon.map(poke => {
            const {pokemon} = poke;
            return <li key={pokemon.name}>{pokemon.name.toUpperCase()}</li>
            })
          }
        </ul>
      </div>
      )
  },
  listOne: (props) => {
    const {pokemon, location } = props
    const {pokeID} = location.match.params;
    return (
      <div>
        <h1>{pokemon.name}(id: {pokemon.id})</h1>
          {  Schemas.toString(pokemon)}
        <h3>Weight: {pokemon.weight}</h3>
        <h3>Height: {pokemon.height}</h3>
        <p>Base XP: {pokemon.base_experience} <sup>(The base experience gained for defeating this Pokémon)</sup></p>
                 {Object.keys(pokemon.sprites).map((key) => {
                   if (pokemon.sprites[key]) return <img src={pokemon.sprites[key]} alt={key} />
                 })}

            <ul>
              <li>
                <details><summary>Abilities</summary>
                <ul>
                  { pokemon.abilities.map(a => {
                      const {ability} = a;
                      return <li> {ability.name}</li>
                    })
                  }
                </ul>
              </details>
              </li>

              <li>
                <details><summary>Forms</summary>
                <ul>
                  { pokemon.forms.map(f => {
                    return <li key={f.name}>{f.name}</li>
                    })
                  }
                </ul>
              </details>
              </li>

              <li>
                <details><summary>Stats</summary>
                  { pokemon.stats.map(s => {
                    const {stat} = s;
                    return (
                      <details>
                      <summary>{s.stat.name}</summary>
                      <p>Effort: {s.effort}</p>
                      <p>Base Stat: {s.base_stat}</p>
                    </details>
                    )
                    })
                  }
                </details>
              </li>

              <li>
                <details><summary>Moves</summary>
                <ul>
                  { pokemon.moves.map(m => {
                      return(
                         <details>
                           <summary> {m.move.name}</summary>
                          { m.version_group_details.map(d =>{
                            return(
                              <ul>
                               <li>Method: {d.move_learn_method.name} Name: {d.version_group.name}</li>
                             </ul>
                            )
                          })}
                         </details>
                      )
                    })
                  }
                </ul>
              </details>
              </li>

          </ul>
      </div>
      )

  }
}

export default Schemas;
