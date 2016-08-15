import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const showAction = (data) => {
  //alert("show action dispatched");
  return {
    type: "SHOW",
    data: data,
  }
}

let createHandlers = function(dispatch) {

  const data = [
    { k: '12345', v: 'abcde' },
    { k: '23451', v: 'eabcd' },
    { k: '34512', v: 'cdeab' },
    { k: '12453', v: 'abde3' },
    { k: '34521', v: 'cdeba' },
  ];

  let onClick = function(event) {
    dispatch(showAction(data));
    console.dir(data);
  };

  return onClick;
    // other handlers

}



class DarkButton extends Component {

  constructor(props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch);
  }

  render() {
    return (<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <RaisedButton
            label={this.props.name}
            onClick={this.handlers} />

            </MuiThemeProvider>);
  }
}

function mapStateToProps(state) {
  return { res: state.data };
}

export default connect()(DarkButton);
