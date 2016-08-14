// import { connect } from 'react-redux';
// import { createStore } from 'redux';
var connect = require('react-redux').connect;
var createStore = require('redux').createStore;


var actionCreator = function() {
  return {
    type: 'FIRST_ACTION',
  }
}

var store = createStore(() =>{});

var reducer = function (args){
  console.log("Reducer args:", args);
}

var store_1 = createStore(reducer);

var sao = 1;




var reducer_0 = function (state, action) {
  console.log('reducer_0 was called with state', state, 'and action', action);
}

var store_0 = createStore(reducer_0);


console.log('store_0 state after initialization:', store_0.getState());

var reducer_1 = function (state, action) {
  console.log('reducer_1 was called with state', state, 'and action', action)
  if (typeof state === 'undefined') {
    return {}
  }

  return state;
}

var store_1 = createStore(reducer_1)
console.log('store_1 state after initialization:', store_1.getState());


var reducer_2 = function (state = {}, action) {
  console.log('reducer_2 was called with state', state, 'and action', action);

  return state;
}
