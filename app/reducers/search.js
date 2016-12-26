import update from 'react-addons-update';

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
    return {...state, isGotClassname: true}

  case "ADD_OR_REMOVE_CLASS_BY_CHECKBOX":
    if (state.checkedClassList === undefined && action.isChecked === true){
      // init
      return {...state, checkedClassList: [action.label]}
    }

    else if(action.isChecked === true){
      // insert
      let updated = update(state, {checkedClassList: {$push: [action.label]}})
      return {...state, ...updated }

    }
    else if(action.isChecked === false){
      // remove
      let index = state.checkedClassList.indexOf(action.label)
      let newChecked = update(state.checkedClassList, {$splice: [[index, 1]]})
      return {...state, checkedClassList: newChecked }
    }
    return {...state}

  default:
    return state

  }
}
