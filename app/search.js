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
    return (
        <ResponsiveReactGridLayout
      className="layout"
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
      onClick={() => this.context.rename(this.context.showRes)} />
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
      fullWidth={true} />
    )
  }
}

SearchTextField.contextTypes = {
  text: React.PropTypes.any,
  textInput: React.PropTypes.any,
  
};


class SearchResTable extends Component {

  render() {
    let res = this.context.searchRes;
    var rows = [];
    for (var index in res){
      rows.push(
          <TableRow>
          <TableRowColumn>{res[index].type}</TableRowColumn>
          <TableRowColumn>{res[index].source}</TableRowColumn>
          <TableRowColumn>{res[index].content}</TableRowColumn>
          </TableRow>
      )
    }


    return (
        <Table>
        <TableHeader>
        <TableRow>
        <TableHeaderColumn>类别</TableHeaderColumn>
        <TableHeaderColumn>来源</TableHeaderColumn>
        <TableHeaderColumn>内容</TableHeaderColumn>
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
      showRes: this.props.showRes
    }
  }

  render() {
    return (
        <MuiThemeProvider>
        <SearchGrid>
        <div key={'searchBtn'} data-grid={{ x: 9, y: 2, w: 1, h: 1, static: true }}>
        <SearchBtn /></div>

        <div key={'searchText'} data-grid={{ x: 3, y: 2, w: 5, h: 1, static: true }}><SearchTextField /></div>

        <div key={'searchResTable'} className={this.props.showRes ? 'hidden' : ''} data-grid={{ x: 3, y: 3, w: 6, h: 1, static: true }}><SearchResTable /></div> 
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
};


let select = state => {return state};


function mapDispatchToProps(dispatch) {

  let parseJson = function(response){

    return response.json()
  };

  let showClick = function(json) {
    // alert('onclick');
    //console.log(json.tt);
    //console.dir(json.json())
    //json.json().then(function(j){console.log(j.tt)});
    // dispatch({
    //   type: "RENAME",
    //   data: json.b
    // });

  };
  let changeText = function(text){

    console.log("change text");
    dispatch({
      type: "CHANGETEXT",
      data: text
    });
  }
  //        .then(parseJson)
  
  return {
    rename: function(isShow){
      // alert(readtext);
      dispatch({
        type:"SHOW",
        data:!isShow
      })
      // fetch("/tt",
      //       {method: 'PUT',
      //        headers:{
      //          'Accept': 'application/json',
      //          'Content-Type': 'application/json'},
      //        body: JSON.stringify({'hehe':readtext})
      //       })
      //   .then(showClick)
      //   .catch(function(e){console.log('parsing failed', e)})
    },
    textInput: function(event){
      changeText(event.target.value);
    }
  };
}


export default connect(select, mapDispatchToProps)(SearchBar);
