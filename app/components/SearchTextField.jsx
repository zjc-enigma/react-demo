import TextField from 'material-ui/TextField';
import React, { Component } from 'react';
class SearchTextField extends Component {

  constructor(props, context){
    super(props, context);
  }

  handleInput(event){
    this.props.updateSearchText(event.target.value)
  }

  render() {
    return (
         <TextField
            hintText={this.props.hint}
            value={this.props.text}
            onChange={event => this.handleInput(event)}
            fullWidth={true} />
    )
  }
}

export default SearchTextField
