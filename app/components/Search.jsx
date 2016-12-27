import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import HorizontalLinearStepper from './HorizontalLinearStepper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
//import { browserHistory, Router, Route } from 'react-router'
//import {MultiSelect} from 'react-selectize'
//import '../../node_modules/react-selectize/themes/index.css';
import SearchTextField from './SearchTextField';
import SearchBtn from './SearchBtn';
import MyChip from './Chip'
import MyCheckBox from './CheckBox'


let select = state => ({
  ...state.search,
})
const mapDispatchToProps = dispatch => {

  let parseJson = response => response.json()

  let finishedSearchRes = () => dispatch({type: "FINISHED_SEARCH_RES"})

  return {
    updateSearchText: text => {
      dispatch({
        type: "UPDATE_SEARCH_TEXT",
        data: text
      })
    },
    updateClassSelection: selectionArray => {
      dispatch({
        type: 'UPDATE_CLASS_SELECTION',
        data: selectionArray
      });
    },
    getMultiselectOption: () => {
      fetch("/multiselect_options",
            {method: "GET",
             headers:{
               'Accept': 'application/json',
               'Content-Type': 'application/json'},
            })
        .then(parseJson)
        .then(json => dispatch({type: "UPDATE_MULTISELECT_OPTIONS",
                                data: json}))
        .catch(function(e){console.log('parsing failed', e)})
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
          .then(parseJson)
          .then(json => dispatch({type: "SEARCH_QUERY", data: json}))
          .then(finishedSearchRes)
          .catch(function(e){console.log('parsing failed', e)})
      } else {
        alert("Please input search text");
      }
    },
    searchQuery: text => {
      if(text){
        fetch('/query',
              {method: "POST",
               headers:{
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'},
               body: JSON.stringify({key: text})
              })
          .then(parseJson)
          .then(json => dispatch({type: "SEARCH_QUERY", data: json}))
          .catch(function(e){console.log('parsing failed', e)})

      } else {
        alert("Please input search text");
      }
    },
    onClickChips: () => {

    },

    obtainAllClassname: () => {

      fetch("/all_classname",
        {method: "GET",
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
        })
        .then(parseJson)
        .then(json => dispatch({
          type: "UPDATE_ALL_CLASSNAME",
          data: json}))
        .then(dispatch({
          type: "FINISHED_GET_CLASSNAME",
        }))
        .catch(function(e){console.log('parsing failed', e)})
    },

    onCheck: (e, isChecked, label) => {
      dispatch({
        type: "ADD_OR_REMOVE_CLASS_BY_CHECKBOX",
        label: label,
        isChecked: isChecked
      })
      console.log(label, isChecked)
    }
  }
}


@connect(select, mapDispatchToProps)
class Search extends Component {

  constructor(props, context){
    super(props, context)
    this.props.obtainAllClassname()
    this.props.getMultiselectOption()
  }


  static defaultProps = {
    checkedClassList: [],
  }

  search(text){
    //console.log('search Query:', text)
    //TODO: add assert of text===""
    //this.props.searchQuery(text)
    this.props.searchQueryByClass(text, this.props.checkedClassList)
    this.props.history.push('/selection')
  }
  //                   checked={this.props.checkedClassList.indexOf(item) > -1}
  render() {
    console.log("PROPS:", this.props)
    return (
      <MuiThemeProvider>
        <div className={'search'}>
          <div className={'classCheckBox'}>
            {this.props.isGotClassname &&
             this.props.allClassNameList.map(
             item => 
                 <MyCheckBox
                   checkedList={this.props.checkedClassList}
                   label={item}
                   onCheck={this.props.onCheck} />)
            }
          </div>

          <div className={'searchBar'}>

            <div className={'searchText'}>
              <SearchTextField
                hint={"input your secrets"}
                text={this.props.searchText}
                updateSearchText={this.props.updateSearchText}/></div>

            <div className={'searchBtn'}>
              <SearchBtn
                label={"Search"}
                onClick={() => this.search(this.props.searchText)}/></div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}


/* class CategorySelection extends Component {
 * 
 *   constructor(props, context){
 *     super(props, context);
 *   }
 * 
 *   render() {
 *     let ops = [{label:"apple",
 *                 value:"apple"},
 *                {label:"mango",
 *                 value:"mango"},
 *                {label:"grapes",
 *                 value:"grapes"}]
 * 
 *     return (
 *         <MultiSelect
 *       options={this.props.classOptions}
 *       onValuesChange = {values => this.props.updateClassSelection(values)}
 *       placeholder={"请选择投放类目"}>
 *         </MultiSelect>
 *     )
 *   }
 * }
 * */
export default Search
