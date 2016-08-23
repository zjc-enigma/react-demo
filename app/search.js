import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import {Responsive, WidthProvider} from 'react-grid-layout';
import React, { Component } from 'react';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
//import ReactGridLayout from 'react-grid-layout';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import renameBtn from './actions';
import 'whatwg-fetch';

class SearchGrid extends Component{

  constructor(props, context){
    super(props, context);
  }

  render() {

    var layouts = {lg:[{i:"searchText", x: 5, y: 2, w: 4, h: 0.2, static:true},
                       {i:"searchBtn", x: 9, y: 2, w: 1, h: 0.2, static:true},
                       {i:"searchResTable", x: 4, y: 2.3, w: 7, h: 0.5, static:true }],
                   md:[
                     {i:"searchText", x: 5, y: 2, w: 4, h: 1, static:true},
                     {i:"searchBtn", x: 9, y: 2, w: 1, h: 1, static:true},
                     {i:"searchResTable", x: 3, y: 3, w: 6, h: 1, static:true }],

                   sm:[
                     {i:"searchText", x: 2, y: 2, w: 2, h: 1, static:true},
                     {i:"searchBtn", x: 4, y: 2, w: 1, h: 1, static:true},
                     {i:"searchResTable", x: 2, y: 3, w: 6, h: 1, static:true }],

                   xs:[
                     {i:"searchText", x: 0, y: 2, w: 1, h: 1, static:true},
                     {i:"searchBtn", x: 1, y: 2, w: 1, h: 1, static:true},
                     {i:"searchResTable", x: 0, y: 3, w: 6, h: 1, static:true }],
                  }
    return (
        <ResponsiveReactGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
      cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
        {this.props.children}
        </ResponsiveReactGridLayout>
    );
  }
}



class SearchBtn extends Component {
  constructor(props, context){
    super(props, context);
  }

  render() {
    //() => this.context.rename(this.context.text)
    //
    return (
        <RaisedButton
      label={this.context.name}
      onClick={() => this.context.rename()} />
    )
  }
}
SearchBtn.contextTypes = {
  name: React.PropTypes.any,
  rename: React.PropTypes.any,
  text: React.PropTypes.any,
  showRes: React.PropTypes.any
};




class SearchTextField extends Component {

  constructor(props, context){
    super(props, context);
  }
  inputHandler(event){
    this.context.text = event.target.value;
  }
  //      onChange={this.inputHandler.bind(this)}
  //      ref="testField"
  render() {
    return (
        <TextField
      hintText="Input your secret"
      value={this.context.text}
      onChange={this.context.textInput}
      fullWidth={true}/>
    )
  }
}

SearchTextField.contextTypes = {
  text: React.PropTypes.any,
  textInput: React.PropTypes.any,

};


class SearchResTable extends Component {

  render() {

    var searchRes = this.context.searchRes;

    var rows = [];
    for (var index in searchRes){
        rows.push(
            <TableRow>
            <TableRowColumn>{searchRes[index].tag}</TableRowColumn>
            <TableRowColumn>头条</TableRowColumn>
            <TableRowColumn style={{width: '60%'}}>{searchRes[index].content}</TableRowColumn>
            </TableRow>)
    }

    const handleRowSelected = (slices) => {
      let selectedItems = slices.map(slice => {
        return searchRes[slice];
      })
      this.context.updateSelection(selectedItems);

    }

    //console.dir(rows);
    return (
        <Table
      multiSelectable={true}
      onRowSelection={(slices) => handleRowSelected(slices)}>
        <TableHeader>
        <TableRow>
        <TableHeaderColumn>类别</TableHeaderColumn>
        <TableHeaderColumn>来源</TableHeaderColumn>
        <TableHeaderColumn style={{width: '60%'}}>内容</TableHeaderColumn>
        </TableRow>
        </TableHeader>
        <TableBody>
        {rows}
        </TableBody>
        </Table>
    );
  }
}

SearchResTable.contextTypes = {
  searchRes: React.PropTypes.any,
  updateSelection: React.PropTypes.any,
  resTableSelection: React.PropTypes.any,
};


class SearchBar extends Component {

  constructor(props, context){
    super(props, context);
  }

  getChildContext(){
    return {
      name: this.props.name,
      rename: this.props.rename,
      text: this.props.text,
      textInput: this.props.textInput,
      showRes: this.props.showRes,
      searchRes: this.props.searchRes,
      resTableSelection: this.props.resTableSelection,
      updateSelection: this.props.updateSelection,

    }
  }

  render() {
    //className={this.props.showRes ? 'hidden' : ''}
    return (
        <MuiThemeProvider>
        <SearchGrid>

        <div key={'searchText'} ><SearchTextField /></div>

        <div key={'searchBtn'} ><SearchBtn /></div>

        <div key={'searchResTable'} ><SearchResTable /></div>

        </SearchGrid>
        </MuiThemeProvider>
    )
  }
}

SearchBar.childContextTypes = {
  name: React.PropTypes.any,
  rename: React.PropTypes.any,
  text: React.PropTypes.any,
  textInput: React.PropTypes.any,
  showRes: React.PropTypes.any,
  searchRes: React.PropTypes.any,
  resTableSelection: React.PropTypes.any,
  updateSelection: React.PropTypes.any,
};


let select = state => {return state};


function mapDispatchToProps(dispatch) {

  let parseJson = function(response){
    console.dir(response)
    return response.json()
  };

  let showClick = function(json) {
    // alert('onclick');
    //console.log(json.tt);
    //console.dir(json.json())
    //json.json().then(function(j){console.log(j.tt)});
    console.log("showclick");
    console.log(typeof json);
    console.dir(json);
    dispatch({
      type: "SEARCHRES",
      data: json
    });

  };
  let changeText = function(text){

    console.log("change text");
    dispatch({
      type: "CHANGETEXT",
      data: text
    });
  }
  

  return {
    rename: function(){

      dispatch({
        type:"SHOW",
        data: true
      })
      fetch("/rand_titles",
            {method: 'GET',
             headers:{
               'Accept': 'application/json',
               'Content-Type': 'application/json'},
            })
        .then(parseJson)
        .then(showClick)
        .catch(function(e){console.log('parsing failed', e)})
    },
    textInput: function(event){
      changeText(event.target.value);
    },
    updateSelection: function(selectionItems){
      //console.log("updateselection");
      // console.dir(selectionItems);
      dispatch({
        type: 'UPDATE_RES_SELECTION',
        data: selectionItems
      });
    }
  };
}


export default connect(select, mapDispatchToProps)(SearchBar);
