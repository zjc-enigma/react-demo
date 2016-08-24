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
import { PropTypes } from 'react';

const demoWords = ["农夫山泉", "是","一家","中国", "大陆", "的", "饮用水", "和", "饮料", "生产","企业"];

class WordsGrid extends Component{

  constructor(props, context){
    super(props, context);
  }

  render() {

    var wordsLayouts = [];

    for (var index in demoWords){
      wordsLayouts.push({i:"word"+index.toString(), x:parseInt(index)*0.5, y:2, w:0.5, h:0.2, static:true})

    }
    var layouts = {lg:wordsLayouts,
                   md:wordsLayouts,
                   sm:wordsLayouts,
                   xs:wordsLayouts,
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

class WordComponent extends Component{

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
      placeholder={this.props.holder}
      multi={true}
      name="form-field-name"
      value={this.props.value}
      options={options}
      onChange={(val) => this.props.multiSelect(val, this.props.id)}
        />
        </MuiThemeProvider>
    )
  }
}

class Writer extends Component {

  render() {
    var words = [];
    for (var index in demoWords){
      words.push(
          <div key={"word"+index.toString()}>
          <WordComponent
        holder={demoWords[index]}
        value={eval('this.props.selectedWord' + index.toString())}
        id={index} /></div>
      )
    }
    return (
        <MuiThemeProvider>
        <WordsGrid>
        {words}
        </WordsGrid>
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
    multiSelect: (val, id) => {
      dispatch({type:"MULTISELECT", data:val, id:id});
    },
  };
}
export default connect(select, mapDispatchToProps)(Writer);
