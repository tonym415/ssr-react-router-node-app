import React from 'react';
import Schemas from './Schema';

export default function List(props) {
      var path = props.location.match.path
      var listOpt = {
        '/pokemon/:pokemon':{
          'desc': 'Pokemon Detail',
          'handler' : Schemas.listOne
        },
        '/ability/:ability':{
          'desc': 'Ability Detail',
          'handler': Schemas.listAbility
        }
      }

      console.log(path)
      console.log(Object.keys(listOpt))
      if (Object.keys(listOpt).includes(path)){
        console.log(listOpt[path].desc)
        return listOpt[path].handler(props)
      }else{
        var s = (path.indexOf('pokemon') < 0) ? 'Ability' : 'Pokemon'
        console.log(s + ' Full Listing')
        return Schemas.listAll(props)
      }
}
