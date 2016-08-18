import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import ReactDOM from 'react-dom';
import React  from 'react';
import BaseGrid from './grids';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

var store = createStore(() => {});

ReactDOM.render(
    <Provider store={store}>
    <BaseGrid />
    </Provider>,
  document.getElementById('demo1')
);

