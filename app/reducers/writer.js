import update from 'react-addons-update';

const removeByKey = (myObj, deleteKey) => {

  return Object.keys(myObj)
    .filter(key => key !== deleteKey)
    .reduce((result, current) => {
      result[current] = myObj[current];
      return result;

    }, {});
}

export default function (state = [], action) {
  switch(action.type){

  case "UPDATE_EDITOR_STATE":
    return {...state, editorState: action.data}

  case "ON_CLICK_LIST_INSERT_TEXT":
    return {...state, insertText: action.data}

  case "ON_CLICK_WORD_LIST":
    console.log('state:', state)

    if (state.selectedWords === undefined){
      return {...state, selectedWords: [action.data]}
    }

    const index = state.selectedWords.indexOf(action.data)
    if(index > -1){
      const newSelected = update(state.selectedWords, {$splice: [[index, 1]]})
      return {...state, selectedWords: newSelected}

    }

    return update(state, {selectedWords: {$push: [action.data]}})

  case "GET_WORD_LIST":
    return {...state, wordList: action.data}

  default:
    return state
  }
}
