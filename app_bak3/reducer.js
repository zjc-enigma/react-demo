let reducer = (state={}, action) => {

  console.log('in reducer');
  switch(action.type){

  case 'RENAME':
    return {
      name:action.data,
    }
  case 'FILLGRID':
    console.log('in reducer fillgrid case');
    return {
      res: action.data,
    }
  case 'TEST':
    console.log('in reduer test case');
    return Object.assign({}, {
      name: action.data,
    });

  default:
    return state;
  }
}

export default reducer;
