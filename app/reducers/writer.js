export default function (state = [], action) {
  switch(action.type){

  case "TOKENED_SENTENCES":
    return {...state, tokened: action.data}

  case "UPDATE_LAYOUTS":
    return {...state, layouts: action.data}

  case "UPDATE_EDITORS":
    return {...state, editors: action.data}

  case "GET_SIM_WORDS":
    // let ret = {}
    // ret['simWords_' + action.id] = action.data
    // console.log('ret', ret)
    //let stateKey = action.id
    return {...state, [action.id] : action.data}


  default:
    return state

  }
}
