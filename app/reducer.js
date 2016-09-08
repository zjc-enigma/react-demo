export default function reducer(state = [], action) {

  switch(action.type){

  case "TOKEN_SELECTED_SENTENCE":

    return  Object.assign({}, state, {
      tokened:action.data
    })

  case "UPDATE_MULTISELECT_OPTIONS":
    return {...state, classOptions: action.data}

  case "UPDATE_CLASS_SELECTION":
    return {...state, classSelection: action.data}

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
    return  {...state, hideWriter: true}

  case 'SHOW_WRITER':
    return  {...state, hideWriter: false}

  case 'GENERATE_RES':

    var tokened = state.tokened;
    var res = [];

    for (var wordsIndex in tokened){
      var words = tokened[wordsIndex]
      var tmpArray = [];
      var tmp="";
      for (var index in words){
        var selected = eval("state.selected_" + wordsIndex.toString() + "_" + index.toString())
        if(selected) {
          let temp = [];
          for (var i in tmpArray){
            for(var j in selected){
              temp.push(tmpArray[i] + selected[j].label);
            }
          }
          tmpArray = temp;
          // var randWord = selected[Math.floor(Math.random()*selected.length)].label;
          // tmp += randWord;
        } else {
          if(tmpArray.length === 0){
            tmpArray.push(words[index]);
          } else{
            for(var i in tmpArray){
              //tmp += words[index];
              tmpArray[i] += words[index];
            }
          }
        }
      }
      res.push(tmpArray)
    }
    //res = tmpArray;
    return  Object.assign({}, state, {
      generateResult: res,
    })

  case 'UPDATE_SLICES':

    return {...state, slices: action.data};

  case 'HIDE_GENERATE_RES':
    return {...state, hideGenerateRes: true }

  case 'SHOW_GENERATE_RES':
    return {...state, hideGenerateRes: false }

  // case 'HIDE_SEARCH_RES':
  //   return {...state, hideSearchRes: true }

  // case 'SHOW_SEARCH_RES':
  //   return {...state, hideSearchRes: false }

  case 'HIDE_SEARCH_RES':
    return {...state, searchResWidth: 0, searchResHeight: 0 }

  case 'SHOW_SEARCH_RES':
    return {...state, searchResWidth: 7, searchResHeight: 0.5 }

  case 'HIDE_GENERATE_TABLE':
    return {...state, generateResTableWidth:0, generateResTableHeight: 0, hideGenerateRes: true}

  case 'SHOW_GENERATE_TABLE':
    return {...state, generateResTableWidth:7, generateResTableHeight: 0.5, hideGenerateRes: false}

  case "CHANGE_GENERATE_TEXT":
    var key = "generateText_" + action.id;
    var s = {...state};
    s[key] = action.data;
    return s;

  case 'HIDE_SEARCHBAR':

    return {...state,
            searchTextWidth: 0, searchTextHeight: 0,
            searchBtnWidth: 0, searchBtnHeight: 0, hideSearchBtn: true}

  case 'SHOW_SEARCHBAR':
    return {...state,
            searchTextWidth: 6, searchTextHeight: 0.2,
            searchBtnWidth: 1, searchBtnHeight: 0.2, hideSearchBtn: false}

  case 'HIDE_SEARCH_TEXT':
    return {...state, searchTextWidth: 0, searchTextHeight: 0}

  case 'SHOW_SEARCH_TEXT':
    return {...state, searchTextWidth: 6, searchTextHeight: 0.2 }

  case 'HIDE_SEARCH_BTN':
    return {...state, searchBtnWidth: 0, searchBtnHeight: 0, hideSearchBtn: true}

  case 'SHOW_SEARCH_BTN':
    return {...state, searchBtnWidth: 1, searchBtnHeight: 0.2, hideSearchBtn: false}


  case 'HIDE_PREV_BTN':
    return {...state, prevBtnWidth: 0, prevBtnHeight: 0, hidePrevBtn: true}

  case 'SHOW_PREV_BTN':
    return {...state, prevBtnWidth: 1, prevBtnHeight: 0.2, hidePrevBtn: false}

  case 'HIDE_NEXT_BTN':
    return {...state, nextBtnWidth: 0, nextBtnHeight: 0, hideNextBtn: true}

  case 'SHOW_NEXT_BTN':
    return {...state, nextBtnWidth: 1, nextBtnHeight: 0.2, hideNextBtn: false}

   
  case 'MOVE_NEXT_BTN_TO_MIDDLE':
    return {...state, nextBtnX: 7}

  case 'MOVE_NEXT_BTN_TO_RIGHT':
    return {...state, nextBtnX: 11}

  case 'MOVE_SEARCH_BTN_TO_TOP':
    return {...state, searchBtnY: 0.5}

  case 'MOVE_SEARCH_TEXT_TO_TOP':
      return {...state, searchTextY: 0.5}

  case 'MOVE_SEARCH_RES_TO_TOP':
      return {...state, searchResTableY: 1}

  case 'UPDATE_RES_SELECTION':
    return   {...state, resTableSelection: action.data}

  case 'UPDATE_GENERATE_SELECTION':
    return   {...state, generateTableSelection: action.data}

  case 'UPDATE_GENERATE_LIST':
    return   {...state, generateList: action.data}

  case 'RESIZE_WORDS':
    return   {...state, wordsComponentWidth: action.data}

  case 'SEARCHRES':
    return   Object.assign({}, state, {
      searchRes: action.data,
    })

  case 'CHANGETEXT':
    return  Object.assign({}, state, {
        text: action.data,
      })

  default:
    console.log("unknown action:" ,action.type);
    return state;

  }
}
