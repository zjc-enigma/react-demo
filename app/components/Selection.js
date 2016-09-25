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




class Selection extends Component {

  constructor(props, context){
    super(props, context);
  }

  render() {
    return (
        <MuiThemeProvider>
        <SelectionGridLayout>
        <div key={'selectionTable'}>
        <SelectionTable />
        </div>
        <div key={'nextBtn'}>
        <NextBtn label="Next step"/>
        </div>
        <div key={'prevBtn'}>
        <NextBtn label="Prev step"/>
        </div>
        </SelectionGridLayout>
        </MuiThemeProvider>
    )

  }
}

class NextBtn extends Component {
  constructor(props, context){
    super(props, context);
  }

  render() {
    return(
        <RaisedButton
      fullWidth={true}
      label={this.props.label}
      onClick={() => {}} />
    )
  }
}


class PrevBtn extends Component {
  constructor(props, context){
    super(props, context);
  }

  render() {
    return(
        <RaisedButton
      fullWidth={true}
      label={this.props.label}
      onClick={() => {}} />
    )
  }
}




class SelectionGridLayout extends Component {
  constructor(props, context){
    super(props, context);
  }

  render() {

    let layouts = {
      lg:[{i:"selectionTable", x: 2.5, y: 0.5, w: 6, h: 0.2, static:true},
          {i:"nextBtn", x: 6, y: 0.2, w: 1, h: 0.2, static:true},
          {i:"prevBtn", x: 5, y: 0.2, w: 1, h: 0.2, static:true}, 
         ]
    }

    return(
        <ResponsiveReactGridLayout
      layouts={layouts}
      breakpoints={{lg: 800, md: 600, sm: 500, xs: 480, xxs: 0}}
      cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
        {this.props.children}
      </ResponsiveReactGridLayout>
    )
  }
}

class SelectionTable extends Component {


  constructor(props, context){
    super(props, context);
  }
  shouldComponentUpdate (nextProps={}, nextState={}) {

    // var rows = [];

    // for (var sentenceIndex in generateRes){
    //   var res = generateRes[sentenceIndex];
    //   for (var index in res){

    //     rows.push(
    //         <TableRow>
    //         <TableRowColumn>
    //         <TextField
    //       value={res[index]}
    //       fullWidth={true}/>
    //         </TableRowColumn>
    //         </TableRow>)
    //   }
    // }

  }

  render() {

    return (
        <MuiThemeProvider>
        <Table
      selectable={true}
      multiSelectable={true}
      onRowSelection={(slices) => this.handleRowSelected(slices)}>
        <TableHeader>
        <TableRow>
        <TableHeaderColumn>类别</TableHeaderColumn>
        <TableHeaderColumn>来源</TableHeaderColumn>
        <TableHeaderColumn>类目</TableHeaderColumn>
        <TableHeaderColumn style={{width: '60%'}}>内容</TableHeaderColumn>
        </TableRow>
        </TableHeader>
        <TableBody>
        </TableBody>
        </Table>
        </MuiThemeProvider>
    )
  }
}

export default Selection
