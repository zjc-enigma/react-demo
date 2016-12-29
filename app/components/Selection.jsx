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
import MyChip from './Chip'

import '../css/selection.scss';


let mapStateToProps = state => ({
  ...state.selection,
  searchRes: state.search.searchRes,
  searchText: state.search.searchText,
  isFinishedSearchRes: state.search.isFinishedSearchRes
})

const mapDispatchToProps = dispatch => {

  return {
    updateSelection: selection => {
      dispatch({
        type: "UPDATE_SELECTION",
        data: selection
      })
    },
    updateSelectionClass: selection => {
      dispatch({
        type: "UPDATE_SELECTION_CLASS",
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
    },
    clickClassChip: key => {
      dispatch({
        type: "CLICK_CLASS_CHIP",
        data: key
      })
    },


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

  generateClassChips = () => {
    let counter = {}
    for (const item of this.props.searchRes) {

      if(item.label in counter){
        counter[item.label] += 1
      }
      else {
        counter[item.label] = 1
      }
    }

    let colored = {}
    Object.keys(counter).map(key =>
      colored[key] = true
    )

    if (this.props.selectedClass !== undefined &&
        this.props.selectedClass.length > 0) {

      Object.keys(colored).map(key =>
        colored[key] = (this.props.selectedClass.indexOf(key) > -1)
      )
    }


    return Object.keys(counter).map(key =>
      <MyChip
        chipText={key}
        chipTextAvatar={counter[key]}
        colored={colored[key]}
        handleClick={() => this.props.clickClassChip(key)}
        handleDelete={() => {console.log('click close')}} />)
  }


  updateSelection = (selection) => {
    this.props.updateSelection(selection)
    this.props.updateSelectionClass(selection)
  }

  render() {
    console.log("PROPS:", this.props)

    return (
      <MuiThemeProvider>
        <div className={'selection'}>
          <div className={'classChipArea'}>
            {
              this.props.searchRes === undefined ? null : this.generateClassChips()
            }
          </div>
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
             updateSelection={this.updateSelection}
             selectedClass={this.props.selectedClass} /></div>
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
    let isSearchUpdate = nextProps.searchRes !== this.props.searchRes
    let isClassUpdate = nextProps.selectedClass !== this.props.selectedClass
    return isSearchUpdate || isClassUpdate
  }

  generateRows(){

    let filteredRes = this.props.searchRes

    if(this.props.selectedClass !== undefined &&
       this.props.selectedClass.length > 0) {

      filteredRes = this.props.searchRes.filter(item =>
        this.props.selectedClass.indexOf(item.label) > -1)
      console.log('filterd res:', filteredRes)
    }
    return filteredRes.map(item =>
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
              {
                this.props.searchRes===undefined ? null : this.generateRows()
              }
            </TableBody>
          </Table>
        </MuiThemeProvider>
    )
  }
}

export default Selection
