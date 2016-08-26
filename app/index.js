import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom';
import React  from 'react';
import SearchBar from './search';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import reducer from './reducer';
import Writer from './writer';
//import TButton from './writer';
//import { Router, Route, hashHistory, browserHistory } from 'react-router';
//import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

var store = createStore(reducer);
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
    <SearchBar />
    </Provider>,

  document.getElementById('demo1'));

