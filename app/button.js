import React, { Component } from 'react';
import { render } from 'react-dom';

import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class DarkButton extends Component {
  render() {
    return (<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <RaisedButton label={this.props.name} />
            </MuiThemeProvider>);
  }
}

export default DarkButton;
