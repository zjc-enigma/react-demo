import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import HorizontalLinearStepper from './HorizontalLinearStepper'



let select = state => {return state};
const mapDispatchToProps = dispatch => {

}


@connect(select, mapDispatchToProps)
class Search extends Component {

  constructor(props, context){
    super(props, context);
  }

  render() {
    return (
        <MuiThemeProvider>

        </MuiThemeProvider>
    )
  }
}

export default Search
