import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import HorizontalLinearStepper from './HorizontalLinearStepper'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import SelectTable from './SelectTable';
import { withRouter } from 'react-router';
import fileDownload from 'react-file-download';
import '../css/generate.scss';

let mapStateToProps = state => ({
  ...state.generate,
  generateResList: state.writer.generateResList })

const mapDispatchToProps = dispatch => {

  return {
    updateTableSelection: (item) => {
      dispatch({
        type: "ON_CLICK_SELECT_RES",
        data: item
      })
    },

    saveToCsv: selectedRes => {
      let saveRes = selectedRes.join('\n')
      fileDownload(saveRes, "result.txt")
    }
  }
}


class SaveBtn extends Component {
  constructor(props, context){
    super(props, context);
  }

  save() {
    this.props.saveToCsv(this.props.saveList)

  }

  render() {
    return(
      <RaisedButton
        fullWidth={true}
        label={this.props.label}
        onClick={() => this.save()} />
    )
  }
}



@connect(mapStateToProps, mapDispatchToProps)
class GenerateTable extends Component {
  constructor(props, context){
    super(props, context);
  }
  render() {

    return(
      <MuiThemeProvider>
        <div className={'Generate'}>

          <div className={'resTable'}>
            <SelectTable
              itemArray={this.props.generateResList}
              updateTableSelection={this.props.updateTableSelection}
            />
          </div>

          <div className={'saveBtn'}>
            <SaveBtn
              label={"Save"}
              saveList={this.props.selectedRes}
              saveToCsv={this.props.saveToCsv} />
          </div>

          
        </div>
      </MuiThemeProvider>
    )
  }
}
export default withRouter(GenerateTable)

