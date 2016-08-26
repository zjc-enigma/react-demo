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
    console.dir(this.props.options);
    var wordsLayouts = [];

    for (var index in demoWords){
      wordsLayouts.push({i:"word"+index.toString(), x:parseInt(index), y:2, w:1, h:0.2, static:true})

    }

    wordsLayouts.push({i:"generate", x:15, y:2, w:1, h:0.2, static:true})

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
      cols={{lg: 16, md: 10, sm: 6, xs: 4, xxs: 2}}>
        {this.props.children}
        </ResponsiveReactGridLayout>
    );
  }
}

class WordComponent extends Component{

  constructor(props, context){
    super(props, context);
    this.props.getSimWords(this.props.holder, this.props.id)
  }

  handler(val) {
    this.props.multiSelect(val, this.props.id)
  }

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
      options={this.props.options}
      onChange={(val) => this.handler(val)}
        />
        </MuiThemeProvider>
    )
  }
}


class GenerateButton extends Component{

  generate(){

    var res = "";
    for (var index in demoWords){
      var selected = eval("this.props.all.selected" + index.toString())

      if(selected) {

        var randWord = selected[Math.floor(Math.random()*selected.length)].label;

        res += randWord;
      }
      else {
        res += demoWords[index];
      }
    }
    console.log("generated:" + res);
    return res;
  }
  render(){

    return(
        <MuiThemeProvider>
        <RaisedButton
      label={this.props.name}
      onClick={() => this.generate()}
        />
        </MuiThemeProvider>)
  }
}


class Writer extends Component {

  // getValue(index){
  //   var selected = this.props.selected;

  //   if(selected){
  //                                    return eval("selected.word" + index.toString());
  //   }
  //   else{
  //     return [];
  //   }
  // }

  render() {
    var words = [];

    for (var index in demoWords){
      words.push(
          <div key={"word"+index.toString()}>
          <WordComponent
        holder={demoWords[index]}
        value={eval("this.props.selected" + index.toString())}
        multiSelect={this.props.multiSelect}
        getSimWords={this.props.getSimWords}
        options={eval('this.props.simWords' + index.toString())}
        id={index} /></div>
      )
    }
    words.push(<div key={"generate"}>
               <GenerateButton
               name="Go"
               all={this.props}
               /> </div>)

    return (
        <MuiThemeProvider>
        <WordsGrid>
        {words}
        </WordsGrid>
        </MuiThemeProvider>
    )
  }
}

let select = state => {return state};

function mapDispatchToProps(dispatch) {
  let parseJson = function(response){
    return response.json()
  };

  let updateSimWords = function(json, id) {

    dispatch({
      type: "GET_SIM_WORDS",
      data: json,
      id: id
    });
  };

  return {
    multiSelect: (val, id) => {
      dispatch({type:"MULTISELECT", data:val, id:id});

      console.log('multiselect');
      console.dir(val);
    },
    getSimWords: (word, id) => {

      fetch("/simwords",
            {method: "POST",
             headers:{
               'Accept': 'application/json',
               'Content-Type': 'application/json'},
             body: JSON.stringify({base_word: word})
            })
        .then(parseJson)
        .then((json) => updateSimWords(json, id))
        .catch(function(e){console.log('parsing failed', e)})

    }

  };
}
export default connect(select, mapDispatchToProps)(Writer);
