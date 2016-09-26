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
    return {...state, [action.word]: action.data}


  default:
    return state

  }
}
