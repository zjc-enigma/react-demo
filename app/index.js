import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import ReactGridLayout from 'react-grid-layout';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'whatwg-fetch';
//import MyGrid from './grid';
//import BaseGrid from './grid';
import reducer from './reducer';

import RaisedButton from 'material-ui/RaisedButton';
import { PropTypes } from 'react';
import testBaseGrid from './action';
import fillGrid from './action';
import { connect } from 'react-redux';

var store = createStore(reducer);

// let makeButton = () => {
// }

class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store // This corresponds to the `store` passed in as a prop
    };
  }
  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  store: React.PropTypes.object
};


class BaseGrid extends Component{
  constructor(props, context){
    super(props, context);
  }
  componentDidMount(){
    const { store } = this.context;

  }
  getChildContext(){
    console.log('base grid [getChildContext]');
    console.dir(this.props);
    console.log(this.props.name);
    return {
      name: this.props.name,
    }
  }
  render() {

    let layout = [];
    let searchButtonItem = {
      i: "search",
      x: 1,
      y: 0,
      w: 5,
      h: 5 };

    layout.push(searchButtonItem);
    return (
        <ReactGridLayout
      className="layout"
      layout={layout}
      cols={3}
      rowHeight = {5}
      width={1200}>
        <div key="search">
            <SearchButton />
        </div>
        </ReactGridLayout>
           );
  }
}

BaseGrid.childContextTypes = {
  name: React.PropTypes.any,
};


function mapStateToProps(state) {
  return { name: state.name };
}

let select = state => {return state};
connect(select)(BaseGrid);

class SearchButton extends Component {
  constructor(props, context){
    super(props, context);
  }
  render() {
    //console.dir(this.context);

    return (<MuiThemeProvider>
            <RaisedButton
            label={this.context.name}
            onClick={()=>{}} />
            </MuiThemeProvider>);
  }
}
SearchButton.contextTypes = {
  name: React.PropTypes.any,
};
//store.dispatch(fillBaseGrid(searchButton));
store.dispatch(testBaseGrid());

//store.dispatch(fillGrid());

ReactDOM.render(
    <Provider store={store}>
    <BaseGrid />
    </Provider>,
  document.getElementById('demo1')
);
