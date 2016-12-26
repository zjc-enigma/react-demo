export default function (state = [], action) {
  switch(action.type){
  case "UPDATE_SEARCH_TEXT":
    return {...state, searchText: action.data}

  case "SEARCH_QUERY":
    return {...state, searchRes: action.data}

  case "UPDATE_MULTISELECT_OPTIONS":
    return {...state, classOptions: action.data}

  case "UPDATE_CLASS_SELECTION":
    return {...state, classSelection: action.data}

  case "UPDATE_ALL_CLASSNAME":
    return {...state, allClassNameList: action.data}

  case "FINISHED_GET_CLASSNAME":
    return {...state, isGetClassname: true}

  default:
    return state

  }
}
