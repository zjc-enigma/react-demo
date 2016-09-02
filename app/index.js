import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom';
import React  from 'react';
import SearchBar from './search';
import { Provider } from 'react-redux';
//import { createStore, combineReducers } from 'redux';
import reducer from './reducer';
import Writer from './writer';
import {
  combineReducers
} from 'redux-immutable';

import {
  createStore
} from 'redux';
import Immutable from 'immutable';

//import HorizontalLinearStepper from './search';
//import TButton from './writer';
//import { Router, Route, hashHistory, browserHistory } from 'react-router';
//import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const initialState = Immutable.Map();
//const rootReducer = combineReducers(reducer);
const store = createStore(reducer, initialState);

//var store = createStore(reducer);
// const store = createStore(
//   combineReducers({
//     ...reducer,
//     routing: routerReducer
//   })
// )
//const history = syncHistoryWithStore(browserHistory, store)
//Route path="/writer" component={Writer} > </Route>

ReactDOM.render(
    <Provider store={store}>
    <MuiThemeProvider>
    <SearchBar />
    </MuiThemeProvider>
    </Provider>,
  document.getElementById('demo1'));
store.dispatch({type: "SHOW_SEARCHBAR" });
store.dispatch({type:"INIT", finished: false, stepIndex: 0});
//store.dispatch({type:"HIDE_SEARCHBAR"});
store.dispatch({type:"HIDE_WRITER"});
store.dispatch({type:"HIDE_PREV_BTN"});
store.dispatch({type: "HIDE_GENERATE_TABLE" });
store.dispatch({type: "HIDE_SEARCH_RES" });
store.dispatch({type: "HIDE_NEXT_BTN" });

