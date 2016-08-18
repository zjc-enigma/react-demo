import React, { Component } from 'react';
import { render } from 'react-dom';
import TextField from 'material-ui/TextField';
import {grey300, grey600, grey800, grey900} from 'material-ui/styles/colors';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const dark_style = {

  underlineStyle: {
    borderColor: grey300,
  },
  floatingLabelStyle: {
    color: grey900,
  },
  underlineFocusStyle: {
    bordercolor: grey900,
  }
};

class DarkHintTextField extends Component {

  render() {
    return (<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <TextField
            hintText={this.props.name}
            hintStyle={dark_style.underlineStyle}
            underlineStyle={dark_style.underlineStyle}
            underlineFocusStyle={dark_style.underlineFocusStyle}
            />
            </MuiThemeProvider>);
  }
}

