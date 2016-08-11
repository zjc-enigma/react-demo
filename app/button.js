import React, { Component } from 'react';
import { render } from 'react-dom';

import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class DarkButton extends Component {

  getInitialState (){
    return {data: []};
  }
  handleClick(event){
    //this.setState({value: event.target.value});
    //this.setState({value: })
    $.ajax({
      url: "http://127.0.0.1:5000/restful",
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({data:data});
        //alert(data.toString());
      }.bind(this),
      error: function(xhr, status, err){
        console.error("http://127.0.0.1:5000/restful", status, err.toString());
      }.bind(this),
    });

    //alert("clicked");
  }

  render() {
    return (<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <RaisedButton
            label={this.props.name}
            onClick={this.handleClick} />

            </MuiThemeProvider>);
  }
}

export default DarkButton;
