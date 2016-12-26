import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

//checked={this.props.checked}
const MyCheckbox = props => {

  let isChecked = false

  if(props.checkedList.indexOf(props.label) > -1){
    isChecked = true
  }

  return (
      <Checkbox
        label={props.label}
        style={styles.checkbox}
        checked={isChecked}
        onCheck={(event, isInputChecked) =>
                props.onCheck(event, isInputChecked, props.label)}
    />
    )
}

export default MyCheckbox;
