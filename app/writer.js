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
import Select from 'react-select';
import { PropTypes } from 'react'

class WriterGrid extends Component{

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




class Writer extends Component{

  // constructor(props, context){
  //   super(props, context);
  // }
  // getChildContext(){
  //   return {
  //   }
  // }

  // logChange() {
  //   //console.log("Selected: " + val.value);
  //   //console.dir(this);
  //   //console.dir(this.props.selectedWords);
  //   this.props.multiSelect();
  // }

  render() {

    var options = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
      { value: 'the', label: 'w' },
      { value: 'on', label: 'o' },
      { value: 'far', label: 'T' },
    ];


    return (
        <MuiThemeProvider>
        <Select
      multi={true}
      name="form-field-name"
      value={this.props.selectedWords}
      options={options}
      onChange={(val) => this.props.multiSelect(val)}
        />
        </MuiThemeProvider>
    )
  }
}

// Writer.propTypes = {
//   selectedWords: PropTypes.any,
//   multiSelect: PropTypes.any,
// }

class TButton extends Component{

  render(){
    return(
        <MuiThemeProvider>
        <RaisedButton
      label={this.props.name}
      onClick={(name) => this.props.rename(name)}
        />
        </MuiThemeProvider>
    )
  }

}


let select = state => {return state};

// function mapStateToProps(state) {
//   return {
//     name: state.selectedWords,
//   };
// }


function mapDispatchToProps(dispatch) {
  return {
    multiSelect: (val) => {
      dispatch({type:"MULTISELECT", data:val});
    },
  };
}
export default connect(select, mapDispatchToProps)(Writer);
