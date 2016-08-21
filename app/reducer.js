export default function reducer(state = [], action) {

  switch(action.type){

  case 'RENAME':
    return  {
      name: action.data,
    }

  case 'CHANGETEXT':
    return  [
      ...state,
      {
        text: action.data,
      }]

  default:
    return state;
  }
}
