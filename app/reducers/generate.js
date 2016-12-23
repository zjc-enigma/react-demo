import update from 'react-addons-update';


export default function (state = [], action) {
  switch(action.type){
  case "ON_CLICK_SELECT_RES":
    if (state.selectedRes === undefined){
      return {...state, selectedRes: [action.data]}
    }

    let updated = update(state, {selectedRes: {$push: [action.data]}})
    return {...state, ...updated}


  default:
    return state;
  }
}
