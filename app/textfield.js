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

// const TextFieldExampleSimple = () => (
//   <div>
//     <TextField
//       hintText="Hint Text"
//     /><br />
//     <br />
//     <TextField
//       hintText="The hint text can be as long as you want, it will wrap."
//     /><br />
//     <TextField
//       id="text-field-default"
//       defaultValue="Default Value"
//     /><br />
//     <TextField
//       hintText="Hint Text"
//       floatingLabelText="Floating Label Text"
//     /><br />
//     <TextField
//       hintText="Hint Text"
//       floatingLabelText="Fixed Floating Label Text"
//       floatingLabelFixed={true}
//     /><br />
//     <TextField
//       hintText="Password Field"
//       floatingLabelText="Password"
//       type="password"
//     /><br />
//     <TextField
//       hintText="MultiLine with rows: 2 and rowsMax: 4"
//       multiLine={true}
//       rows={2}
//       rowsMax={4}
//     /><br />
//     <TextField
//       hintText="Message Field"
//       floatingLabelText="MultiLine and FloatingLabel"
//       multiLine={true}
//       rows={2}
//     /><br />
//     <TextField
//       hintText="Full width"
//       fullWidth={true}
//     />
//   </div>
// );

export default DarkHintTextField;
