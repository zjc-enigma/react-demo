import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom';
import React  from 'react';
//import SearchBar from './search';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import reducer from './reducer';
//import Writer from './writer';
import TButton from './writer';

var store = createStore(reducer);


ReactDOM.render(
    <Provider store={store}>
    <TButton />
    </Provider>,
  document.getElementById('demo1'));

//store.dispatch({type:"RENAME", data:"Search"});
//store.dispatch({type:"UPDATE_RES_SELECTION", data:[] });
// store.dispatch({
//   type:"MULTISELECT",
//   data:"hahaha"
// });
// store.dispatch({
//   type:"RENAME",
//   data:"123456"
// });
