import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactGridLayout from 'react-grid-layout';
import DarkButton from './button';
import DarkHintTextField from './textfield';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
//import { reducer } from './reducer';




let showReducer = (state = [], action) => {
  console.log("exec reducer");
  switch (action.type){
  case 'SHOW': 
    return {
      res : action.data
    }
  default:
    return state
  }
}


// const showAction = (results) => {

//   return {
//     type: "SHOW",
//     data: results,
//   }
// }



var reducer = combineReducers({
  show: showReducer,
})

let store = createStore(reducer);
//console.log("default store state"+ store.getState().toString())
//console.dir(store.getState())
//store.dispatch(showAction(data));
//console.log("after action dispatched store state"+ store.getState().toString() )
//console.dir(store.getState())
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class MyGrid extends Component{

  render() {
    const { res } = this.props;
    // layout is an array of objects, see the demo for more complete usage
    //console.dir(res);
    //var aa = <DarkButton name="hi"/>;
    let layout = [];
    let index = 0;
    { for (let r in res) {
      let item = { i: res[r].k,
                   x: index,
                   y: 0,
                   w: 5,
                   h: 5 };
      layout.push(item);
      index += 5;
    } }

    return (<ReactGridLayout
            className="layout"
            layout={layout}
            cols={23}
            rowHeight = {5}
            width={1200}>

            {res.map(
              function(rt){
                return(<div key={rt.k}>{rt.v}</div>)}
            )}
            </ReactGridLayout>
           );
  }
}


function mapStateToProps(state) {
  return { res: state.show.res };
}

MyGrid = connect(mapStateToProps)(MyGrid);

ReactDOM.render(
  <DarkHintTextField name="input your secrets" />,
  document.getElementById('demo1')
);


ReactDOM.render(
    <Provider store={store}>
    <DarkButton />
    </Provider>,
  document.getElementById('demo2')
);


ReactDOM.render(
    <Provider store={store}>
    <MyGrid />
    </Provider>,
  document.getElementById('demo3')
);
