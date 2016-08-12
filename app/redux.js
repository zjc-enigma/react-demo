import { connect } from 'react-redux';
import { createStore } from 'redux';

var actionCreator = function() {
  return {
    type: 'FIRST_ACTION',
  }
}

var store = createStore(() =>{});

var reducer = function (...args){
  console.log("Reducer args:", args)
}

var store_1 = createStore(reducer);

