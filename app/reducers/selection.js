export default function (state = [], action) {
  switch(action.type){

  case "UPDATE_SELECTION":
    return {...state, selectionRes:action.data.map(selection => {return selection.content})}

  default:
    return state
  }
}
