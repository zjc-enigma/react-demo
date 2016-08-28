export default function reducer(state = [], action) {

  switch(action.type){
  case "NEXT_STEP":
    console.log("next step");
    return  Object.assign({}, state, {
      stepIndex: action.stepIndex,
      finished: action.finished
    })
  case 'GET_SIM_WORDS':
    var ret = {}
    ret['simWords' + action.id.toString()] = action.data;
    return Object.assign({}, state, ret)

  case 'MULTISELECT':
    var ret = {}
    ret["selected" + action.id.toString()] = action.data

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
