export default function (state = [], action) {
  switch(action.type){

  case "UPDATE_SELECTED_RES":
    return {...state, selectedRes:action.data.map(selection => {return selection.content})}

  default:
    return state
  }
}
