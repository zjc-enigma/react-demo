import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';



const styles = {
  block: {
    maxWidth: 25,
  },
  radioButton: {
      width: 'auto'
  }
};



const MyRadioButton = props => (
    <div>
        <RadioButtonGroup
          style={{ display: 'flex', flex: 0 }}
          name="shipSpeed"
          defaultSelected="composite"
          onChange={(event, value) => props.onChange(value)}>

            <RadioButton
              value="composite"
              label="组合"
              style={styles.radioButton} />

          <RadioButton
              value="continue"
              label="连续"
              style={styles.radioButton} />

      </RadioButtonGroup>
    </div>
)


export default MyRadioButton;

