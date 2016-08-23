export default function reducer(state = [], action) {

  switch(action.type){
    
  case 'SHOW':
    return   Object.assign({}, state, {
      showRes: action.data,
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
    return state;
  }
}
