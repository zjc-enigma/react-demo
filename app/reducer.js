const reducer = (state = [], action) => {
  switch (action.type){
  case 'SHOW': 
    return {
      data : action.data
    }
  default:
    return state
  }
}

export default function reducer;
