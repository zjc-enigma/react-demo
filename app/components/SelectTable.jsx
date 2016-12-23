import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import React,{ Component } from 'react';
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { withRouter } from 'react-router';




class SelectionTable extends Component {
  constructor(props, context){
    super(props, context);
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.itemArray !== this.props.itemArray
  }


  generateRows(){

    return this.props.itemArray === undefined ? null :
           this.props.itemArray.map(item => <TableRow>
                      <TableRowColumn>{item}</TableRowColumn>
                      <TableRowColumn>{'未知'}</TableRowColumn>
                      </TableRow>)
  }

  handleSelection(slices) {
    let selection = slices.map(index => this.props.itemArray[index])
    this.props.updateTableSelection(selection)
  }

  render() {

    return (
      <MuiThemeProvider>
        <Table
          selectable={true}
          multiSelectable={true}
          onRowSelection={slices => this.handleSelection(slices)}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>语料</TableHeaderColumn>
              <TableHeaderColumn>类别</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {this.generateRows()}
          </TableBody>
        </Table>
      </MuiThemeProvider>
    )
  }
}

export default SelectionTable
