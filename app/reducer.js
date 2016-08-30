export default function reducer(state = [], action) {

  switch(action.type){

  case "TOKEN_SELECTED_SENTENCE":
    console.log('token selected sentences');
    console.dir(state);
    return  Object.assign({}, state, {
      tokened:action.data
    })
  case "INIT":
    return  Object.assign({}, state, {
      stepIndex: action.stepIndex,
      finished: action.finished
    })
  case "PREV_STEP":
    return Object.assign({}, state, {
      stepIndex: action.stepIndex,
    })
  case "NEXT_STEP":

    return  Object.assign({}, state, {
      stepIndex: action.stepIndex,
      finished: action.finished
    })
  case 'GET_SIM_WORDS':
    var ret = {}
       ret['simWords_' + action.id.toString()] = action.data;
       return Object.assign({}, state, ret)
    return state;

  case 'MULTISELECT':
    var ret = {}
       ret["selected_" + action.id.toString()] = action.data
       return  Object.assign({}, state, ret)
    return state;

  case 'HIDE_WRITER':
    return  {...state, hideWriter: action.data}

  case 'GENERATE_RES':

    var tokened = state.tokened;
    var res = [];

    for (var wordsIndex in tokened){
      var words = tokened[wordsIndex]
      var tmp="";
      for (var index in words){
        var selected = eval("state.selected_" + wordsIndex.toString() + "_" + index.toString())
        if(selected) {
          var randWord = selected[Math.floor(Math.random()*selected.length)].label;
          tmp += randWord;
        }
        else {
          tmp += words[index];
        }
      }
      res.push(tmp);
    }
    
    return  Object.assign({}, state, {
      generateResult: res,
    })

  case 'UPDATE_SLICES':
    console.dir(state);
    return {...state, slices: action.data};

  case 'HIDE_GENERATE_RES':
    return {...state, hideGenerateRes: true }

  case 'SHOW_GENERATE_RES':
    return {...state, hideGenerateRes: false }

  case 'HIDE_SEARCH_RES':
    return {...state, hideSearchRes: true }

  case 'SHOW_SEARCH_RES':
    return {...state, hideSearchRes: false }


  case 'HIDE_SEARCHBAR':
    return {...state, hideSearchBar: true }

  case 'SHOW_SEARCHBAR':
    return {...state, hideSearchBar: false }


  case 'UPDATE_RES_SELECTION':
    return   {...state, resTableSelection: action.data}
    

  case 'SEARCHRES':
    return   Object.assign({}, state, {
      searchRes: action.data,
    })

  case 'CHANGETEXT':
    return  Object.assign({}, state, {
        text: action.data,
      })

  default:
    console.log("unknown action:" + action.type);
    return state;

  }
}
