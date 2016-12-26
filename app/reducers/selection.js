export default function (state = [], action) {
  switch(action.type){

  case "UPDATE_SELECTION":
    return {...state, selectionRes:action.data.map(selection => {return selection.content})}

  // case "UPDATE_SEARCH_TEXT_IN_SELECTION":
  //   return {...state, searchText: action.data}


  default:
    return state
  }
}
