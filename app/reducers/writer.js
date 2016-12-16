export default function (state = [], action) {
  switch(action.type){

  case "UPDATE_EDITOR_STATE":
    return {...state, editorState: action.data}

  case "ON_CLICK_LIST_INSERT_TEXT":
    return {...state, insertText: action.data}

  case "ON_CLICK_WORD_LIST":
    return {...state, word: action.data}

  case "GET_WORD_LIST":
    return {...state, wordList: action.data}

  default:
    return state
  }
}
