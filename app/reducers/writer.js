export default function (state = [], action) {
  switch(action.type){

  case "TOKENED_SENTENCES":
    return {...state, tokened: action.data}

  case "UPDATE_LAYOUTS":
    return {...state, layouts: action.data}

  case "UPDATE_EDITORS":
    return {...state, editors: action.data}

  case "UPDATE_SENTENCE_ARRAY":
    return {...state, sentenceArray: action.data}

  case "UPDATE_SIM_WORDS":
    //console.log('get sim words')
    //let ret = {}
    //ret[action.word] = action.data
    //return {...state, [action.word] : action.data}
    //console.log('ret',ret)
    return {...state, [action.word]: action.data}


  default:
    return state

  }
}
