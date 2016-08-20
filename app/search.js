import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import {Responsive, WidthProvider} from 'react-grid-layout';
import React, { Component } from 'react';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
//import ReactGridLayout from 'react-grid-layout';
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
};




class SearchTextField extends Component {

  constructor(props, context){
    super(props, context);
  }
  render() {
    return (
        <TextField
      hintText="Input your secret"
      value={this.context.text}
      onChange={this.context.textInput}
      ref="testField"
      fullWidth={true}/>
    )
  }
}

SearchTextField.contextTypes = {
  text: React.PropTypes.any,
  textInput: React.PropTypes.any,
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
      textInput: this.props.textInput
    }
  }

  render() {
    return (
        <MuiThemeProvider>
        <SearchGrid>
        <div key={'searchBtn'} data-grid={{ x: 2, y: 2, w: 1, h: 1, static: true }}>
        <SearchBtn /></div>

        <div key={'searchText'} data-grid={{ x: 0, y: 2, w: 2, h: 1, static: true }}><SearchTextField /></div>
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
};


let select = state => {return state};

function mapDispatchToProps(dispatch) {

  let parseJson = function(response){
    return response.json()
  };

  let showClick = function(json) {
    dispatch({
      type: "RENAME",
      data: json.b
    });

  };
  let changeText = function(text){
    dispatch({
      type: "CHANGETEXT",
      data: text
    });
  }

  return {
    rename: function(readtext){
      alert(readtext);
      // fetch("/restful",
      //       {method: 'GET',
      //        headers:{'Accept': 'application/json',
      //                 'Content-Type': 'application/json'}})
      //   .then(parseJson)
      //   .then(showClick)
      //   .catch(function(e){console.log('parsing failed', e)})
    },
    textInput: function(event){
      changeText(event.target.value);
    }
  };
}


export default connect(select, mapDispatchToProps)(SearchBar);
