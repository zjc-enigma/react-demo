import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {deepOrange50, deepOrangeA100, blue300, indigo900} from 'material-ui/styles/colors';

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
    console.log('clicked chip', this.props.chipText)
    //alert('You clicked the Chip.');
  }

  //onRequestDelete={this.props.handleDelete}
  render() {
    let colored = deepOrangeA100
    let nonColored = deepOrange50
    let color = this.props.colored ? colored : nonColored

    return (
      <Chip
        onTouchTap={() => {}}
        onClick={this.handleClick}
        style={styles.chip}
        backgroundColor={color} >
        <Avatar
          size={32}
          color={indigo900}
          backgroundColor={color}>
          {this.props.chipTextAvatar}</Avatar>
        {this.props.chipText}
      </Chip>
    )
  }
}
