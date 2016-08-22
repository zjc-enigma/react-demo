import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import ReactDOM from 'react-dom';
import React  from 'react';
import SearchBar from './search';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import reducer from './reducer';


var store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
    <SearchBar />
    </Provider>,
  document.getElementById('demo1')
);

store.dispatch({type:"RENAME", data:"hehehehehe"});
//store.dispatch({type:"SHOW", data:true });
