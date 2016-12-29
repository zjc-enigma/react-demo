import update from 'react-addons-update';

//in ES6 using set to get unique Array
let uniq = a => [...new Set(a)]
//let initState = {"selectionResClass": []}

export default function (state=[], action) {
  switch(action.type){

  case "UPDATE_SELECTION":
    return {...state,
            selectionRes: action.data.map(selection => selection.content)}

  case "UPDATE_SELECTION_CLASS":
    let classArray = action.data.map(selection => selection.label)
    classArray = [...new Set(classArray)];

    return {...state,
            selectionResClass: classArray}


  case "UPDATE_TOTAL_SELECTION":
    if (state.totalSelection === undefined){
      return {...state, totalSelection: action.data}
    }

    let oldSelections = state.totalSelection
    let newSelections = action.data
    let mergedSelections = uniq([...oldSelections, ...newSelections])
    let updated = update(state, {totalSelection: {$set: mergedSelections}})
    return {...state, ...updated}

  case "CLICK_CLASS_CHIP":
    //console.log("data:", action.data)
    if (state.selectedClass === undefined){
      return {...state, selectedClass:[action.data]}
    }
    let index = state.selectedClass.indexOf(action.data)
    if (index > -1){
      // remove
      let newSelected = update(state.selectedClass, {$splice: [[index, 1]]})
      return {...state, selectedClass: newSelected}
    }
    else {
      // insert
      let updated = update(state, {selectedClass: {$push: [action.data]}})
      return {...state, ...updated}
    }

  default:
    return state
  }
}
