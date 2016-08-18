let fillGrid = () => {
  return {
    type: "FILLGRID",
    data: [
      {
        k: "big",
        v: "small",
        c: "huge",
        d: "tiny"
      },
      {
        k: "big1",
        v: "small2",
        c1: "huge",
        d1: "tiny"
      }
    ]
  }
}

let fillBaseGrid = (searchButton) => {
  return {
    type: "FILLGRID",
    data: {
      searchButton: {
        name: "ss",
        value: searchButton
      }
    }
  }
}


let testBaseGrid = () => {
  return {
    type: "TEST",
    data: "hehehehe",
  }
}



// function renameButton(name){
//   return {
//     type: "RENAME",
//     data: name
//   }
// }
  
export default fillBaseGrid;
export default fillGrid;
export default testBaseGrid;
