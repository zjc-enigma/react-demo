



export default function reducer(state = [], action) {

  switch(action.type){

  case "TOKEN_SELECTED_SENTENCE":
    console.log('token selected');
    console.log(action.data);
    return  Object.assign({}, state, {
      tokened:action.data
    })
  case "INIT":
    return  Object.assign({}, state, {
      stepIndex: action.stepIndex,
      finished: action.finished
    })
  case "NEXT_STEP":

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

  case 'HIDE_WRITER':
    return  Object.assign({}, state, {
      hideWriter: action.data,
    })

  case 'GENERATE_RES':

    var words = action.words
    var res = [];
    var tmp="";
    for (var index in words){

      var selected = eval("state.selected" + index.toString())
        if(selected) {
          var randWord = selected[Math.floor(Math.random()*selected.length)].label;
          tmp += randWord;
        }
        else {
          tmp += words[index];
        }
    }
    res.push(tmp);
    
    return  Object.assign({}, state, {
      generateResult: res,
      hideResTable: action.data,
    })
  case 'HIDE_SEARCHBAR':
    return  Object.assign({}, state, {
      hideSearchBar: action.data,
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
