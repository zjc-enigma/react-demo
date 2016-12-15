export default function (state = [], action) {
  switch(action.type){

  case "UPDATE_EDITOR_STATE":
    return {...state, editorState: action.data}

  case "ON_CLICK_LIST_INSERT_TEXT":
    return {...state, insertText: action.data}

  default:
    return state
  }
}
