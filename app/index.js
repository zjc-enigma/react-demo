import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
//import ReactGridLayout from 'react-grid-layout';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'whatwg-fetch';

let reducer = (state={}, action) => {

  switch(action.type){
  case 'RENAME': 
    return {
      name:action.data
    }
  default:
    return state
  }
}


let store = createStore(reducer);


let createHandler = function(dispatch){

  let showClick = function(json) {
    //console.dir(response.json());
    //console.log(response.json().keys());
    dispatch({
      type: "RENAME",
      data: json.b})
  };

  let onClick = function(event){
    fetch("/restful",
          {method: 'GET',
           headers:{'Accept': 'application/json',
                    'Content-Type': 'application/json'}})
      .then(function(response){return response.json()})
      .then(showClick)
      .catch(function(e){console.log('parsing failed', e)})

  };

  return onClick;
  //
  //.then(function(json){console.log('parsed json', json)})
}

class DarkButton extends Component {

  constructor(props){
    super(props);
    this.handler = createHandler(this.props.dispatch);
  }

  render() {

    return (
        <MuiThemeProvider>
        <RaisedButton
      label="search"
      onClick={this.handler} />
        </MuiThemeProvider>)
  }

}

class Button extends Component {

  render() {
    let handleClick = () => {};
    return (
      <MuiThemeProvider>
        <FlatButton
      label={this.props.name}
      onClick={this.handleClick} />
        </MuiThemeProvider>
    )
  }
}
// ReactDOM.render(
//     <MuiThemeProvider>
//     <RaisedButton label="heheheh"/>
//     </MuiThemeProvider>,
//   document.getElementById('demo1')
// );

function mapStateToProps(state) {
  return { name: state.name };
}

Button = connect(mapStateToProps)(Button);
DarkButton = connect()(DarkButton);

ReactDOM.render(
    <Provider store={store}>
    <DarkButton />
    </Provider>,
  document.getElementById('demo2')
);

ReactDOM.render(
    <Provider store={store}>
    <Button />
    </Provider>,
  document.getElementById('demo3')
);

//var t = setTimeout("after 5s", 5000);
//store.dispatch(rename_action(rename_action))

