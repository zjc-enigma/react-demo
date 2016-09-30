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


let mapStateToProps = state => ({state: state.selection,
                                 searchRes: state.search.searchRes })

const mapDispatchToProps = dispatch => {

  return {
    updateSelection: selection => {
      dispatch({
        type: "UPDATE_SELECTION",
        data: selection
      })
    }
  }
}


@connect(mapStateToProps, mapDispatchToProps)
class Selection extends Component {

  constructor(props, context){
    super(props, context);
  }


  nextStep(){
    this.props.history.push('/writer')
  }

  render() {
    
    return (
        <MuiThemeProvider>
        <SelectionGridLayout>
        <div key={'selectionTable'}>
        <SelectionTable
      searchRes={this.props.searchRes}
      updateSelection={this.props.updateSelection} />
        </div>
        <div key={'nextBtn'}>
        <NextBtn label="Next step" onClick={() => this.nextStep()}/>
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
      onClick={() => this.props.onClick()} />
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
      lg:[{i:"selectionTable", x: 2, y: 0.5, w: 8, h: 0.2, static:true},
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
  componentWillReceiveProps(nextProps){

  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.searchRes !== this.props.searchRes
  }
  
  generateRows(){
    return this.props.searchRes===undefined ?
      null : this.props.searchRes.map(item => <TableRow>
                                      <TableRowColumn>{item.tag}</TableRowColumn>
                                      <TableRowColumn>{'头条'}</TableRowColumn>
                                      <TableRowColumn>{'测试'}</TableRowColumn>
                                      <TableRowColumn style={{width:'60%'}}>{item.content}</TableRowColumn>
                                      </TableRow>)
  }

  handleSelection(slices) {
    let selection = slices.map(index => {return this.props.searchRes[index]})
    this.props.updateSelection(selection)
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
        <TableHeaderColumn>类别</TableHeaderColumn>
        <TableHeaderColumn>来源</TableHeaderColumn>
        <TableHeaderColumn>类目</TableHeaderColumn>
        <TableHeaderColumn style={{width: '60%'}}>内容</TableHeaderColumn>
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

export default Selection
