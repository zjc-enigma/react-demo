export default function reducer(state = [], action) {

  switch(action.type){
  case 'MULTISELECT':
    ret = {}
    ret['selectedWord' + action.id.toString()] = action.data;
    return  Object.assign({}, state, ret)

  case 'SHOW':
    return  Object.assign({}, state, {
      showRes: action.data,
    })

  case 'UPDATE_RES_SELECTION':

    return   Object.assign({}, state, {
      resTableSelection: action.data,
    })

  case 'SEARCHRES':
    return   Object.assign({}, state, {
      searchRes: action.data,
    })

  case 'RENAME':
    return  {
      name: action.data,
    }

  case 'CHANGETEXT':
    return  Object.assign({}, state, {
        text: action.data,
      })

  default:
    console.log("unknown action:" + action.type);
    return state;

  }
}
