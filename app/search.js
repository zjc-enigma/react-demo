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
import Select from 'react-select';
import 'whatwg-fetch';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

import FlatButton from 'material-ui/FlatButton';
const demoWords = ["农夫山泉", "是","一家","中国", "大陆", "的", "饮用水", "和", "饮料", "生产","企业"];
/**
 * Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 * Avoid using long step names in horizontal steppers.
 *
 * Linear steppers require users to complete one step in order to move on to the next.
 */
class HorizontalLinearStepper extends Component {
  constructor(props, context){
    super(props, context);
    // this.state = {
    //   finished: false,
    //   stepIndex: 0,
    // };
  }


  handleNext (stepIndex) {
    this.props.steperNext(stepIndex);
  };

  handlePrev ()  {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
      // return (
      //     <SearchBar
      //   name={this.props.name}
      //   searchQuery={this.props.searchQuery}
      //   text={this.props.text}
      //   textInput={this.props.textInput}
      //   showRes={this.props.showRes}
      //   searchRes={this.props.searchRes}
      //   resTableSelection={this.props.resTableSelection}
      //   updateSelection={this.props.updateSelection}
      //     />
      // );
      return "0 steps";
    case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render() {
    //const {finished, stepIndex} = this.state;
    var finished = this.props.finished;
    var stepIndex = this.props.stepIndex;
    const contentStyle = {margin: '0 16px'};
    console.log(stepIndex);
    console.log(finished);
    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Select campaign settings</StepLabel>
          </Step>
          <Step>
            <StepLabel>Create an ad group</StepLabel>
          </Step>
          <Step>
            <StepLabel>Create an ad</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished ? (
            <p>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  //this.setState({stepIndex: 0, finished: false});
                }}
              >
                Click here
              </a> to reset the example.
            </p>
          ) : (
            <div>
              <p>{this.getStepContent(stepIndex)}</p>
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
            primary={true}
            onClick={() => this.handleNext(stepIndex)}

                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}




class SearchGrid extends Component{

  constructor(props, context){
    super(props, context);
  }

  render() {
    var wordsLayouts = [];
    for (var index in demoWords){
      wordsLayouts.push({i:"word"+index.toString(), x:parseInt(index), y:3, w:1, h:0.2, static:true})

    }

    wordsLayouts.push({i:"generate", x:15, y:2, w:1, h:0.2, static:true})


    var layouts = {lg:wordsLayouts.concat(
      [{i:"steper", x: 5, y: 0, w: 4, h: 0.2, static:true},
       {i:"searchText", x: 5, y: 2, w: 4, h: 0.2, static:true},
       {i:"searchBtn", x: 9, y: 2, w: 1, h: 0.2, static:true},
       {i:"processBtn", x: 10, y: 2, w: 1, h: 0.2, static:true},
       {i:"searchResTable", x: 4, y: 2.3, w: 7, h: 0.5, static:true },
       {i:"generateResTable", x: 4, y: 5, w: 7, h: 0.5, static:true }]),
     md:wordsLayouts.concat(
       [{i:"steper", x: 5, y: 0, w: 4, h: 0.2, static:true},
        {i:"searchText", x: 5, y: 2, w: 4, h: 1, static:true},
        {i:"searchBtn", x: 9, y: 2, w: 1, h: 1, static:true},
        {i:"processBtn", x: 10, y: 2, w: 1, h: 0.2, static:true},
        {i:"searchResTable", x: 3, y: 3, w: 6, h: 1, static:true },
        {i:"generateResTable", x: 4, y: 5, w: 7, h: 0.5, static:true}
       ]),

    sm:wordsLayouts.concat([
      {i:"steper", x: 5, y: 0, w: 4, h: 0.2, static:true},
      {i:"searchText", x: 2, y: 2, w: 2, h: 1, static:true},
      {i:"searchBtn", x: 4, y: 2, w: 1, h: 1, static:true},
      {i:"processBtn", x: 5, y: 2, w: 1, h: 0.2, static:true},
      {i:"searchResTable", x: 2, y: 3, w: 6, h: 1, static:true},
      {i:"generateResTable", x: 4, y: 5, w: 7, h: 0.5, static:true}
    ]),

    xs:wordsLayouts.concat([
      {i:"steper", x: 5, y: 0, w: 4, h: 0.2, static:true},
      {i:"searchText", x: 0, y: 2, w: 1, h: 1, static:true},
      {i:"searchBtn", x: 1, y: 2, w: 1, h: 1, static:true},
      {i:"processBtn", x: 2, y: 2, w: 1, h: 0.2, static:true},
      {i:"searchResTable", x: 0, y: 3, w: 6, h: 1, static:true }]),}

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
  search(text){
    this.context.searchQuery(text);
  }
  render() {
    //() => this.context.rename(this.context.text)
    //
    return (
        <RaisedButton
      label={this.props.name}
      onClick={() => this.search(this.context.text)} />
    )
  }
}
SearchBtn.contextTypes = {
  name: React.PropTypes.any,
  searchQuery: React.PropTypes.any,
  text: React.PropTypes.any,
  showRes: React.PropTypes.any
};

class ProcessBtn extends Component {

  constructor(props, context){
    super(props, context);
  }
  render() {
    return (
        <RaisedButton
      label={this.props.name}
      onClick={() => {}} />
    )
  }
}



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
      hintText={this.props.hint}
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


class GenerateResTable extends Component{
  constructor(props, context){
    super(props, context);
  }

  render() {
    //          <TableRow selected={this.isSelected(searchRes[index])}>
    console.log("generaterestable");
    console.dir(this.props.generateRes);
    var generateRes = this.props.generateRes;
    var rows = [];
    for (var index in generateRes){
      rows.push(
        <TableRow>
          <TableRowColumn>{generateRes[index]}</TableRowColumn>
          </TableRow>)
    }

    return (
        <Table
      selectable={true}
      multiSelectable={true}
      onRowSelection={(slices) => handleRowSelected(slices)}>
        <TableHeader>
        <TableRow>
        <TableHeaderColumn>文案</TableHeaderColumn>
        </TableRow>
        </TableHeader>
        <TableBody>
        {rows}
      </TableBody>
        </Table>
    )
  }
}


class SearchResTable extends Component {
  constructor(props, context){
    super(props, context);
    this.context.updateSelection([]);
  }
  isSelected (Res) {

    // this.context.resTableSelection.forEach(selectedItem => {
    //   if (selectedItem.content === Res.content)
    //     return true;
    // });
    //
    console.log('is selected');
    console.dir(this.context.resTableSelection);

    for (var index in this.context.resTableSelection){
      if (this.context.resTableSelection[index].content === Res.content){
        return true;
      }
    }
    return false;
  }

  render() {

    var searchRes = this.context.searchRes;

    var rows = [];
    for (var index in searchRes){
        rows.push(
            <TableRow selected={this.isSelected(searchRes[index])}>
            <TableRowColumn>{searchRes[index].tag}</TableRowColumn>
            <TableRowColumn>头条</TableRowColumn>
            <TableRowColumn style={{width: '60%'}}>{searchRes[index].content}</TableRowColumn>
            </TableRow>)

    }

    const handleRowSelected = (slices) => {

      console.dir(this.context.resTableSelection);
      if (slices === 'all') {
        this.context.updateSelection(searchRes);
      } else if  (slices === 'none') {
        this.context.updateSelection([]);

      } else {
        let selectedItems = slices.map(slice => {
          return searchRes[slice];
        })
        this.context.updateSelection(selectedItems);
      }


    }

    return (
        <Table
      selectable={true}
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


class SearchBar extends Component {

  constructor(props, context){
    super(props, context);
  }

  getChildContext(){
    return {
      name: this.props.name,
      searchQuery: this.props.searchQuery,
      text: this.props.text,
      textInput: this.props.textInput,
      showRes: this.props.showRes,
      searchRes: this.props.searchRes,
      resTableSelection: this.props.resTableSelection,
      updateSelection: this.props.updateSelection,

    }
  }

  render() {

    var words = [];
    for (var index in demoWords){
      words.push(
          <div key={"word"+index.toString()} className={this.props.hideWriter ? 'hidden' : ''}>
          <WordComponent
        holder={demoWords[index]}
        value={eval("this.props.selected" + index.toString())}
        multiSelect={this.props.multiSelect}
        getSimWords={this.props.getSimWords}
        options={eval('this.props.simWords' + index.toString())}
        id={index} /></div>
      )
    }
    console.log("searchbar");
    console.dir(this.props.generateResult);

    words.push(
      <div key={'steper'} ><HorizontalLinearStepper
    steperNext={this.props.steperNext}
    stepIndex={this.props.stepIndex}
    finished={this.props.finished} /></div>)

    words.push(
        <div key={'searchText'}
      className={this.props.hideSearchBar ? 'hidden' : ''} >
        <SearchTextField
      name={"input your secrets"} /></div>)

    words.push(
        <div key={'searchBtn'}
      className={this.props.hideSearchBar ? 'hidden' : ''}>
        <SearchBtn
      name={"Search"} /></div>)

    words.push(
        <div key={'searchResTable'}
      className={this.props.hideSearchBar ? 'hidden' : ''}>
        <SearchResTable />
        </div>)

    words.push(
        <div key={'generateResTable'}>
        <GenerateResTable generateRes={this.props.generateResult}/>
        </div>
    )


    return (
        <MuiThemeProvider>
        <SearchGrid>
        {words}
        </SearchGrid>

        </MuiThemeProvider>
    )
  }
}

SearchBar.childContextTypes = {
  name: React.PropTypes.any,
  searchQuery: React.PropTypes.any,
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
    return response.json()
  };

  let showClick = function(json) {

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
  let updateSimWords = function(json, id) {

    dispatch({
      type: "GET_SIM_WORDS",
      data: json,
      id: id
    });
  };

  return {
    steperNext: function(step){
      switch(step){
      case 0:
        dispatch({
          type: "HIDE_SEARCHBAR",
          data: true
        });
        dispatch({
          type: "HIDE_WRITER",
          data: false
        });
        break;

      case 1:
        dispatch({
          type: "HIDE_WRITER",
          data: true
        });
        dispatch({
          type:"GENERATE_RES",
          words: demoWords,
          data: true
        })
        break;

      case 2:
        break;

      default:
        break;
      }
      dispatch({
        type: "NEXT_STEP",
        stepIndex: step + 1,
        finished: step >= 2,
      });

    },

    searchQuery: function(text){

      // var url = new URL("/query"),
      //     params = {key:'大陆'}
      // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      // fetch('http://example.com/foo?name=' + encodeURIComponent(name))
      if(text){
        fetch('/query',
              {method: "POST",
               headers:{
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'},
               body: JSON.stringify({key: text})
              })
          .then(parseJson)
          .then(showClick)
          .catch(function(e){console.log('parsing failed', e)})
      } else {
        dispatch({
          type: "SEARCHRES",
          data: []
        });
      }

    },
    rename: function(){

      fetch("/rand_titles",
            {method: 'GET',
             headers:{
               'Accept': 'application/json',
               'Content-Type': 'application/json'},
             }
            )
        .then(parseJson)
        .then(showClick)
        .catch(function(e){console.log('parsing failed', e)})
    },
    textInput: function(event){
      changeText(event.target.value);
    },
    updateSelection: function(selectionItems){

      dispatch({
        type: 'UPDATE_RES_SELECTION',
        data: selectionItems
      });
    },
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
export default connect(select, mapDispatchToProps)(SearchBar);
//export default HorizontalLinearStepper;
