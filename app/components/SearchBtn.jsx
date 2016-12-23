import RaisedButton from 'material-ui/RaisedButton';
import React, { Component } from 'react';

class SearchBtn extends Component {
  constructor(props, context){
    super(props, context);
  }

  render() {
    return (
      <RaisedButton
        fullWidth={true}
        label={this.props.label}
        onClick={() => this.props.onClick()} />
    )
  }
}

export default SearchBtn
