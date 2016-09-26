export default function (state = [], action) {
  switch(action.type){
  case "UPDATE_SEARCH_TEXT":
    return {...state, searchText: action.data}

  case "SEARCH_QUERY":
    return {...state, searchRes: action.data}
    
  default:
    return state

  }
}
