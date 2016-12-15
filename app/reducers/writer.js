export default function (state = [], action) {
  switch(action.type){

  case "UPDATE_EDITOR_STATE":
    return {...state, editorState: action.data}

  default:
    return state
  }
}
