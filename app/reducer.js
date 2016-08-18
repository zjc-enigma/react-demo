

export default function reducer(state = [], action) {

  switch(action.type){

  case 'RENAME':
    return {
      name: action.data,
    }
  default:
    return state;
  }
}
