import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import HorizontalLinearStepper from './HorizontalLinearStepper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {MultiSelect} from 'react-selectize';
import SelectList from './SelectList';
import { withRouter } from 'react-router';
import CreativeEditor from './Editor';
import '../css/writer.scss';


let mapStateToProps = state => ({
  ...state.writer,
  selectionRes: state.selection.selectionRes })

const mapDispatchToProps = (dispatch) => {


  return {

  }
}




@connect(mapStateToProps, mapDispatchToProps)
class Writer extends Component {

  constructor(props, context){
    super(props, context);
   }

  render() {
    return (
      <div className={"writer"}>
        <SelectList
          className={"list"}
          itemArray={this.props.selectionRes} />
        <CreativeEditor className={"editor"} />
      </div>
    )
  }

}

export default withRouter(Writer)
