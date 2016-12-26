import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class MySnackbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 4000,
      message: 'Event added to your list',
      open: false,
    };
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
    this.props.addToList(this.props.currentSelection)
  };

  handleActionTouchTap = () => {
    this.setState({
      open: false,
    });
    alert('Event removed from your list.');
  };

  handleChangeDuration = (event) => {
    const value = event.target.value;
    this.setState({
      autoHideDuration: value.length > 0 ? parseInt(value) : 0,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <RaisedButton
          onClick={this.handleTouchTap}
          label={this.props.label} />
        <br />
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          action="undo"
          autoHideDuration={this.state.autoHideDuration}
          onActionTouchTap={this.handleActionTouchTap}
          onRequestClose={this.handleRequestClose} />
      </div>
    );
  }
}
