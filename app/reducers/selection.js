import update from 'react-addons-update';

export default function (state = [], action) {
  switch(action.type){

  case "UPDATE_SELECTION":
    return {...state,
            selectionRes:action.data.map(selection => {return selection.content})}

  case "UPDATE_TOTAL_SELECTION":
    if (state.totalSelection === undefined){
      return {...state, totalSelection: action.data}
    }

    let oldSelections = state.totalSelection
    let newSelections = action.data
    let mergedSelections = {...oldSelections, ...newSelections}
    let updated = update(state, {totalSelection: {$set: mergedSelections}})
    return {...state, ...updated}

  default:
    return state
  }
}
