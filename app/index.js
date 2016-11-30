import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { browserHistory, Router, Route } from 'react-router'
import * as reducers from './reducers'
import routes from './routes';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom';
import React  from 'react';
//import SearchBar from './search';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import Writer from './writer';
import HorizontalLinearStepper from './components/HorizontalLinearStepper';

const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
    </DockMonitor>
)
const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer
});


const store = createStore(rootReducer,
                          DevTools.instrument());
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
    <div>
    <HorizontalLinearStepper />
    <Router history={history} routes={routes} />
    <DevTools />
    </div>
    </Provider>,
  document.getElementById('demo1'));
