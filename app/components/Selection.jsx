import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import HorizontalLinearStepper from './HorizontalLinearStepper'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import SearchTextField from './SearchTextField';
import SearchBtn from './SearchBtn';
import MySnackbar from './SneckBar';

import '../css/selection.scss';


let mapStateToProps = state => ({
  ...state.selection,
  searchRes: state.search.searchRes,
  searchText: state.search.searchText
})

const mapDispatchToProps = dispatch => {

  return {
    updateSelection: selection => {
      dispatch({
        type: "UPDATE_SELECTION",
        data: selection
      })
    },
    updateSearchText: text => {
      dispatch({
        type: "UPDATE_SEARCH_TEXT",
        data: text
      })
    },
    searchQueryByClass: (text, className) => {
      if(text){

        fetch('/query_by_class',
          {method: "POST",
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'},
            body: JSON.stringify({key: text, class_name: className})
          })
          .then(res => res.json())
          .then(json => dispatch({type: "SEARCH_QUERY", data: json}))
          .catch(function(e){console.log('parsing failed', e)})
      } else {
        alert("Please input search text");
      }
    },

    addToList: selection_list => {
      dispatch({
        type: "UPDATE_TOTAL_SELECTION",
        data: selection_list
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

  search(text){
    //console.log('search Query:', text)
    //TODO: add assert of text===""
    //this.props.searchQuery(text)
    this.props.searchQueryByClass(text, this.props.classSelection)
  }


  render() {
    console.log("PROPS:", this.props)

    return (
      <MuiThemeProvider>
        <div className={'selection'}>
          <div className={'searchBar'}>
            <div className={'searchTextField'}>
              <SearchTextField
                hint={"input your secrets"}
                text={this.props.searchText}
                updateSearchText={this.props.updateSearchText} /></div>

            <div className={'searchBtn'}>
              <SearchBtn
                label={"Search"}
                onClick={() => this.search(this.props.searchText)} /></div>
          </div>

          <div className={'nextBtn'}>
            <NextBtn label="Next step" onClick={() => this.nextStep()}/></div>

          <div className={'addBtn'}>
            <MySnackbar
              label={"add to list"}
              currentSelection={this.props.selectionRes}
              addToList={this.props.addToList} /></div>

         <div className={'selectionTable'}>
           <SelectionTable
             searchRes={this.props.searchRes}
             updateSelection={this.props.updateSelection} /></div>
         </div>
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
           null : this.props.searchRes.map(item =>
             <TableRow>
               <TableRowColumn>{item.tag}</TableRowColumn>
               <TableRowColumn>{'头条'}</TableRowColumn>
               <TableRowColumn>{item.label}</TableRowColumn>
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
            onRowSelection={slices => this.handleSelection(slices)} >
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
