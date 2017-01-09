import update from 'react-addons-update';
import { Editor, EditorState, Entity, Modifier } from 'draft-js';
const removeByKey = (myObj, deleteKey) => {

  return Object.keys(myObj)
    .filter(key => key !== deleteKey)
    .reduce((result, current) => {
      result[current] = myObj[current];
      return result;

    }, {});
}

const insertTextGetNewEditorState = (text, editorState, decorator) => {
  const contentState = editorState.getCurrentContent()
  const targetRange = editorState.getSelection()
  const contentStateWithInsert = Modifier.insertText(
    contentState,
    targetRange,
    text
  )
  let newEditorState = EditorState.moveSelectionToEnd(
    EditorState.createWithContent(
      contentStateWithInsert,
      decorator))
  return newEditorState
}


export default function (state = [], action) {
  switch(action.type){

  case "UPDATE_WORDS_TABLE_SELECTION":
    return {...state, selectedWords: action.data}

  case "UPDATE_EDITOR_STATE":
    return {...state, editorState: action.data}

  case "ON_CLICK_LIST_INSERT_TEXT":
    return {...state, insertText: action.data}

  case "ON_CLICK_WORD_LIST":
    console.log('state:', state)

    if (state.selectedWords === undefined){
      console.log("state.selectedWords has been cleaned")
      return {...state, selectedWords: [action.data]}
    }

    console.log("state.selectedWords is not cleaned", state.selectedWords)
    // const index = state.selectedWords.indexOf(action.data)
    // if(index > -1){
    //   const newSelected = update(state.selectedWords, {$splice: [[index, 1]]})
    //   return {...state, selectedWords: newSelected}

    // }
    // let updated = update(state, {selectedWords: {$push: [action.data]}})
    // return {...state, ...updated}
    return {...state}

  case "GET_WORD_LIST":
      return {...state, wordList: action.data}

  case "APPEND_WORD_LIST":
      let updated = update(state, {wordList: {$push: action.data}})
      return {...state, ...updated}


  case "CLEAN_SELECTED_WORDS":
    return {...state, selectedWords: undefined}

  case "GENERATE_RES_LIST":
    return {...state, generateResList: action.data}

  case "UPDATE_TEMP_EDITOR_STATE":
    return {...state, tempEditorState: action.data}

  case "UPDATE_RADIO_VALUE":
    return {...state, radioSelection: action.data}




  case "INSERT_TEXT_TO_TEMP_EDITOR":
    let tempEditorState = state.tempEditorState
    let tempText = action.data

    if(tempText && tempEditorState){
      if(state.radioSelection !== "continue") {
        tempText += '\\'
      }
      let newTempEditorState = insertTextGetNewEditorState(tempText,
                                                           tempEditorState,
                                                           action.decorator)

      return {...state,
              tempEditorState: newTempEditorState}
    }
    return {...state}

  case "INSERT_TEXT_TO_EDITOR":
    let editorState = state.editorState
    let text = action.data

    if(text && editorState){
      let newEditorState = insertTextGetNewEditorState(text,
                                                       editorState,
                                                       action.decorator)

      return {...state,
              editorState: newEditorState}
    }
    return {...state}

  default:
    return state;
  }
}
