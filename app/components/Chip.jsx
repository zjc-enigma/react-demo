import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {blue300, indigo900} from 'material-ui/styles/colors';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};


export default class MyChip extends Component {
  constructor(props, context){
    super(props, context)
  }

  handleClick = () => {
    this.props.handleClick()
    console.log('clicked')
    alert('You clicked the Chip.');
  }

  render() {
    return (
      <Chip onTouchTap={() => {}} onClick={this.handleClick} style={styles.chip}>
        <Avatar size={32}>{this.props.chipTextAvatar}</Avatar>
        {this.props.chipText}
      </Chip>
    )
  }
}
