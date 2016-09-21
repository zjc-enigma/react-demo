export default function (state = [], action) {
  switch(action.type){

  case "TOKENED_SENTENCES":
    return {...state, tokened: action.data}

  case "UPDATE_LAYOUTS":
    return {...state, layouts: action.data}

  default:
    return state

  }
}
