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
import { is } from 'immutable';
import {EditTable} from 'material-ui-table-edit';


import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

import FlatButton from 'material-ui/FlatButton';
/**
 * Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 * Avoid using long step names in horizontal steppers.
 *
 * Linear steppers require users to complete one step in order to move on to the next.
 */
class HorizontalLinearStepper extends Component {

  constructor(props, context){
    super(props, context);
  }


  handleNext (stepIndex) {

    this.props.steperNext(stepIndex, this.props.resTableSelection);
  };

  handlePrev (stepIndex)  {
    this.props.steperPrev(stepIndex);
  };

  getStepContent(stepIndex) {
    // switch (stepIndex) {
    //   case 0:
    //   return "0 steps";
    // case 1:
    //     return 'What is an ad group anyways?';
    //   case 2:
    //     return 'This is the bit I really care about!';
    //   default:
    //     return 'You\'re a long way from home sonny jim!';
    // }
  }

  render() {
    
    var finished = this.props.finished;
    var stepIndex = this.props.stepIndex;

    const contentStyle = {margin: '0 16px'};
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
        <p>{this.getStepContent(stepIndex)}</p>
        </div>
        </div>
    );
  }
}

class PrevBtn extends Component{

  constructor(props, context){
    super(props, context);
  }

  render(){
    if(!this.props.hide){
    return(
        <RaisedButton
      label="Back"
      onTouchTap={() => this.props.handler()} />
    )
    } else {
      return null;
    }
  }
}



class NextBtn extends Component{

  constructor(props, context){
    super(props, context);
  }

  handler() {
    // this.props.resizeWords(this.props.wordsWidth);
    this.props.steperNext(this.props.stepIndex, this.props.resTableSelection);
  }
  render(){

    if(!this.props.hide){
      //console.log('wordsWidth', this.props.wordsWidth);
      return(
          <RaisedButton
        label="Next"
        onClick={() => this.handler()} />
      )
    } else {
      return null;
    }
  }
}


class SearchGrid extends Component{
  static defaultProps = {
    searchTextWidth :6,
    searchTextHeight :0.2,
    searchBtnWidth : 1,
    searchBtnHeight :0.2,
    generateResTableWidth: 7,
    generateResTableHeight: 0.5,
    prevBtnWidth: 0,
    prevBtnHeight: 0,
    nextBtnX: 11,
  }


  constructor(props, context){
    super(props, context);
  }

  shouldComponentUpdate (nextProps={}, nextState={}) {
    const thisProps = this.props || {};
    //const thisState = this.state || {};
    //Object.keys(thisState).length !== Object.keys(nextState).length
    if (Object.keys(thisProps).length !== Object.keys(nextProps).length) {
      return true;
    }

    for (const key in nextProps) {
      if (is(thisProps[key], nextProps[key])) {
        return true;
      }
    }

    // for (const key in nextState) {
    //   if (thisState[key] !== nextState[key] || is(thisState[key], nextState[key])) {
    //     return true;
    //   }
    // }
    console.log('no changed');
    return false;
  }


  render() {
    var stepWidth = 0.4;
    var wordsLayouts = [];
    for (var sentenceIndex in this.props.tokened){
      var demoWords = this.props.tokened[sentenceIndex];
      var sentencePos = 0;
      for (var index in demoWords){
        var wordWidth = this.props.wordsComponentWidth[sentenceIndex.toString() + "_" + index.toString()]
        console.log('sentencePos', sentencePos);
        //wordWidth = (wordWidth? wordWidth : 1)*stepWidth;
        var width = wordWidth*stepWidth;
        wordsLayouts.push({i:"word_"+ sentenceIndex.toString() + "_" + index.toString(),
                           x:sentencePos,
                           y:(1 + parseInt(sentenceIndex)),
                           w: width,
                           h:0.2, static:true})
        sentencePos += width;
      }
    }

    var layouts = {lg:wordsLayouts.concat(
      [{i:"steper", x: 5, y: 0, w: 4, h: 0.2, static:true},
       {i:"searchText", x: 4, y: 0.5,
        w: this.props.searchTextWidth,
        h: this.props.searchTextHeight, static:true},
       {i:"searchBtn", x: 10, y: 0.5,
        w: this.props.searchBtnWidth,
        h: this.props.searchBtnHeight, static:true},

       {i:"prevBtn", x: 6.5, y: 0.5,
        w: this.props.prevBtnWidth,
        h: this.props.prevBtnHeight, static:true},

       {i:"searchNextBtn", x: this.props.nextBtnX, y: 0.5, w: 0.2, h: 0.2, static:true},
       {i:"processBtn", x: 0, y: 0, w: 1, h: 0.2, static:true},
       {i:"searchResTable", x: 4, y: 0.8,
        w: this.props.searchResWidth,
        h: this.props.searchResHeight, static:true },

       {i:"generateResTable", x: 4, y: 1,
        w: this.props.generateResTableWidth,
        h: this.props.generateResTableHeight, static:true }]),

     md:wordsLayouts.concat(
       [{i:"steper", x: 5, y: 0, w: 4, h: 0.2, static:true},
        {i:"searchText", x: 5, y: 2, w: 4, h: 0.2, static:true},
        {i:"searchBtn", x: 9, y: 2, w: 1, h: 0.2, static:true},
        {i:"searchNextBtn", x: 10, y: 2, w: 1, h: 0.2, static:true},
        {i:"processBtn", x: 10, y: 2, w: 1, h: 0.2, static:true},
        {i:"searchResTable", x: 3, y: 0.8, w: 6, h: 1, static:true },
        {i:"generateResTable", x: 4, y: 5, w: 7, h: 0.5, static:true}
       ]),

    sm:wordsLayouts.concat([
      {i:"steper", x: 5, y: 0, w: 4, h: 0.2, static:true},
      {i:"searchText", x: 2, y: 2, w: 2, h: 0.2, static:true},
      {i:"searchBtn", x: 4, y: 2, w: 1, h: 0.2, static:true},
      {i:"processBtn", x: 5, y: 2, w: 1, h: 0.2, static:true},
      {i:"searchResTable", x: 2, y: 0.8, w: 6, h: 1, static:true},
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

  shouldComponentUpdate (nextProps={}, nextState={}) {
    const thisProps = this.props || {};
    //const thisState = this.state || {};
    //Object.keys(thisState).length !== Object.keys(nextState).length
    if (Object.keys(thisProps).length !== Object.keys(nextProps).length) {
      return true;
    }

    for (const key in nextProps) {
      if (is(thisProps[key], nextProps[key])) {
        return true;
      }
    }

    // for (const key in nextState) {
    //   if (thisState[key] !== nextState[key] || is(thisState[key], nextState[key])) {
    //     return true;
    //   }
    // }
    console.log('no changed');
    return false;
  }

  search(text){
    this.context.searchQuery(text);
  }
  render() {
    //() => this.context.rename(this.context.text)
    if(!this.props.hide){
      return (
          <RaisedButton
        fullWidth={true}
        label={this.props.name}
        onClick={() => this.search(this.context.text)} />
      )
    } else {
      return null;
    }
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
      onClick={() => this.props.handler()}/>
    )
  }
}



class SearchTextField extends Component {

  constructor(props, context){
    super(props, context);
  }
  shouldComponentUpdate (nextProps={}, nextState={}) {
    const thisProps = this.props || {};
    //const thisState = this.state || {};
    //Object.keys(thisState).length !== Object.keys(nextState).length
    if (Object.keys(thisProps).length !== Object.keys(nextProps).length) {
      return true;
    }

    for (const key in nextProps) {
      if (is(thisProps[key], nextProps[key])) {
        return true;
      }
    }

    // for (const key in nextState) {
    //   if (thisState[key] !== nextState[key] || is(thisState[key], nextState[key])) {
    //     return true;
    //   }
    // }
    console.log('no changed');
    return false;
  }

  inputHandler(event){
    this.context.text = event.target.value;
  }
  render() {
    if(!this.props.hide){
      return (
          <TextField
        hintText={this.props.hint}
        value={this.context.text}
        onChange={this.context.textInput}
        fullWidth={true} />
      )
    } else {
      return null;
    }
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
    if(!this.props.hide){
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
    } else {
      return null;
    }
  }
}


class SearchResTable extends Component {
  constructor(props, context){
    super(props, context);
  }

  shouldComponentUpdate (nextProps={}, nextState={}) {
    const thisProps = this.props || {};
    //const thisState = this.state || {};
    //Object.keys(thisState).length !== Object.keys(nextState).length
    if (Object.keys(thisProps).length !== Object.keys(nextProps).length) {
      return true;
    }

    for (const key in nextProps) {
      if (is(thisProps[key], nextProps[key])) {
        return true;
      }
    }

    // for (const key in nextState) {
    //   if (thisState[key] !== nextState[key] || is(thisState[key], nextState[key])) {
    //     return true;
    //   }
    // }
    console.log('no changed');
    return false;
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   //is(thisProps[key], nextProps[key])
  //   const thisProps = this.props || {}, thisState = this.state || {};
  //   if (is(thisProps, nextProps)){
  //     console.log('changed');
  //     return true;
  //   }
  //   console.log('no changed');
  //       return false;
  // }

  isSelected (Res) {

    for (var index in this.props.resTableSelection){
      if (this.props.resTableSelection[index].content === Res.content){
        return true;
      }
    }
    return false;
  }

  handleRowSelected(slices) {

    if (slices === 'all') {
      this.context.updateSelection(this.props.searchRes);
    } else if  (slices.length === 0) {

      slices = this.props.slices;
      let selectedItems = slices.map(slice => {
        return this.props.searchRes[slice];

      });
      this.context.updateSelection(selectedItems);

    } else {

      this.props.updateSlices(slices);
      let selectedItems = slices.map(slice => {
        return this.props.searchRes[slice];

      });
      this.context.updateSelection(selectedItems);
    }
  }

  render() {
    if(!this.props.hide){
      var searchRes = this.props.searchRes;
      var rows = [];
      for (var index in searchRes){
        rows.push(
            <TableRow selected={this.isSelected(searchRes[index])}>
            <TableRowColumn>{searchRes[index].tag}</TableRowColumn>
            <TableRowColumn>头条</TableRowColumn>
            <TableRowColumn style={{width: '60%'}}>{searchRes[index].content}</TableRowColumn>
            </TableRow>)
      }
      return (
          <Table
        selectable={true}
        multiSelectable={true}
        onRowSelection={(slices) => this.handleRowSelected(slices)}>
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
   } else {
     return null;
   }
  }
}

SearchResTable.contextTypes = {
  updateSelection: React.PropTypes.any,

};

class WordComponent extends Component{

  constructor(props, context){
    super(props, context);
    if(this.props.holder.length > 1){
      this.props.getSimWords(this.props.holder, this.props.id)
    }
  }
  shouldComponentUpdate (nextProps={}, nextState={}) {
    const thisProps = this.props || {};
    //const thisState = this.state || {};
    //Object.keys(thisState).length !== Object.keys(nextState).length
    if (Object.keys(thisProps).length !== Object.keys(nextProps).length) {
      return true;
    }

    for (const key in nextProps) {
      if (is(thisProps[key], nextProps[key])) {
        return true;
      }
    }

    // for (const key in nextState) {
    //   if (thisState[key] !== nextState[key] || is(thisState[key], nextState[key])) {
    //     return true;
    //   }
    // }
    console.log('no changed');
    return false;
  }

  handler(val) {
    this.props.multiSelect(val, this.props.id)
  }

  render() {

    return (
        <MuiThemeProvider>
        <Select
      placeholder={this.props.holder}
      multi={true}
      disabled={this.props.disabled}
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

    // const wordsWidth = {};
    // for (var sentenceIndex in this.props.tokened){
    //   var demoWords = this.props.tokened[sentenceIndex];

    //   for (var index in demoWords){
    //     wordsWidth[sentenceIndex.toString() + "_" + index.toString()] = demoWords[index].length;
    //   }
    // }

  }

  getChildContext(){
    return {
      name: this.props.name,
      searchQuery: this.props.searchQuery,
      text: this.props.text,
      textInput: this.props.textInput,
      showRes: this.props.showRes,
      updateSelection: this.props.updateSelection,

    }
  }
  // {demoWords[index].length === 1? (
  //     <TextField
  //   hintText={demoWords[index]}
  //   fullWidth={true}
  //     />
  // ) : (<WordComponent
  //      holder={demoWords[index]}
  //      value={eval("this.props.selected_" + sentenceIndex.toString() + "_"+ index.toString())}
  //      multiSelect={this.props.multiSelect}
  //      getSimWords={this.props.getSimWords}
  //      options={eval('this.props.simWords_' + sentenceIndex.toString() + "_" +index.toString())}
  //      id={sentenceIndex.toString() + "_" +index.toString()} />)}

  render() {
    var words = [];
    for (var sentenceIndex in this.props.tokened){
      var demoWords = this.props.tokened[sentenceIndex];

      for (var index in demoWords){

        words.push(
            <div
          key={"word_" + sentenceIndex.toString() + "_" + index.toString()}
          className={this.props.hideWriter ? 'hidden' : ''}>
            <WordComponent
          holder={demoWords[index]}
          disabled={demoWords[index].length<=1}
          value={eval("this.props.selected_" + sentenceIndex.toString() + "_"+ index.toString())}
          multiSelect={this.props.multiSelect}
          getSimWords={this.props.getSimWords}
          options={eval('this.props.simWords_' + sentenceIndex.toString() + "_" +index.toString())}
          id={sentenceIndex.toString() + "_" +index.toString()} />
            </div>
        )
      }
    }


    words.push(
        <div key={'steper'} ><HorizontalLinearStepper
      resTableSelection={this.props.resTableSelection}
      steperPrev={this.props.steperPrev}
      steperNext={this.props.steperNext}
      stepIndex={this.props.stepIndex}
      finished={this.props.finished} /></div>)

    words.push(
        <div key={'searchText'}>
        <SearchTextField
      hide={this.props.hideSearchBar}
      hint={"input your secrets"} /></div>)

    words.push(
        <div key={'searchBtn'}>
        <SearchBtn
      hide={this.props.hideSearchBtn}
      name={"Search"} /></div>)


    words.push(
        <div key={'prevBtn'}>
        <PrevBtn
      handler={() => this.props.steperPrev(this.props.stepIndex)}
      hide={this.props.hidePrevBtn}/></div>)


    words.push(
        <div key={"searchNextBtn"}>
        <NextBtn
      label={this.props.stepIndex === 2 ? 'Finish' : 'Next'}
      disabled={this.props.resTableSelection === undefined}
      primary={true}
      stepIndex={this.props.stepIndex}
      resTableSelection={this.props.resTableSelection}
      steperNext={this.props.steperNext}
      hide={false}/>
        </div>
    )
    //      wordsWidth={this.wordsWidth}
    //      resizeWords={this.props.resizeWords}

    // words.push(
    //     <div key={'processBtn'}>
    //     <ProcessBtn
    //   handler={this.props.hideSearch}
    //   name={"Process"} /></div>)

    words.push(
        <div key={'searchResTable'}>
        <SearchResTable
      hide={this.props.hideSearchRes}
      resTableSelection={this.props.resTableSelection}
      searchRes={this.props.searchRes}
      updateSlices={this.props.updateSlices}
      slices={this.props.slices}
        />
        </div>)

    words.push(
        <div key={'generateResTable'}>
        <GenerateResTable
      hide={this.props.hideGenerateRes} 
      generateRes={this.props.generateResult}/>
        </div>
    )

    return (
        <MuiThemeProvider>
        <SearchGrid
      tokened={this.props.tokened}
      searchResWidth={this.props.searchResWidth}
      searchResHeight={this.props.searchResHeight}
      searchTextWidth={this.props.searchTextWidth}
      searchTextHeight={this.props.searchTextHeight}
      searchBtnWidth={this.props.searchBtnWidth}
      searchBtnHeight={this.props.searchBtnHeight}
      generateResTableWidth={this.props.generateResTableWidth}
      generateResTableHeight={this.props.generateResTableHeight}
      prevBtnWidth={this.props.prevBtnWidth}
      prevBtnHeight={this.props.prevBtnHeight}
      nextBtnX={this.props.nextBtnX}
      wordsComponentWidth={this.props.wordsComponentWidth}
        >

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

  let getSelectedSentences = function(selectedItems){
    var res = [];
    for(var index in selectedItems){
      res.push(selectedItems[index].content);
    }
    return res;
  }

  let changeText = function(text){


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
  let handleToken = function(json){
    
    let wordsWidth = {};
    for (var sentenceIndex in json){
      var demoWords = json[sentenceIndex];

      for (var index in demoWords){
        wordsWidth[sentenceIndex.toString() + "_" + index.toString()] = demoWords[index].length;
      }
    }

    console.log('wordsWidth', wordsWidth);
    dispatch({
      type: 'RESIZE_WORDS',
      data: wordsWidth
    });
    dispatch({
      type: "TOKEN_SELECTED_SENTENCE",
      data: json
    });

  }

  return {
    hideSearch: function(){

      dispatch({
        type: "HIDE_SEARCHBAR",
      });

    },

    steperPrev: function(step){
      switch(step){
      case 0:
        break;
      case 1:

        dispatch({
          type: "SHOW_SEARCHBAR",
        });
        dispatch({
          type: "SHOW_SEARCH_RES",
        });

        dispatch({
          type: "HIDE_WRITER",
        });

        dispatch({
          type: "HIDE_PREV_BTN",
        });
        dispatch({
          type: "MOVE_NEXT_BTN_TO_RIGHT",
        });


        break;

      case 2:
        dispatch({
          type: "HIDE_GENERATE_TABLE",
        });
        dispatch({
          type: "SHOW_WRITER",
        });

        break;
      default:
        break;
      }

      if (step > 0) {
        dispatch({type: "PREV_STEP",
                  stepIndex: step - 1});
      }

    },
    steperNext: function(step, selectedSentences){
      switch(step){
      case 0:
        dispatch({
          type: "HIDE_SEARCHBAR",
        });
        dispatch({
          type: "SHOW_PREV_BTN",
        });

        dispatch({
          type: "MOVE_NEXT_BTN_TO_MIDDLE",
        });

        fetch('/token',
              {method: "POST",
               headers:{
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'},
               body: JSON.stringify({sentences: getSelectedSentences(selectedSentences)})
              })
          .then(parseJson)
          .then(json => handleToken(json))
          .catch(function(e){console.log('parsing failed', e)});

        dispatch({
          type: "SHOW_WRITER",
        });
        dispatch({type: "HIDE_SEARCH_RES"});
        break;

      case 1:
        dispatch({
          type: "HIDE_WRITER",
        });
        dispatch({
          type:"GENERATE_RES",
          data: true
        });
        dispatch({
          type: "SHOW_GENERATE_TABLE",
        });
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
          .catch(function(e){console.log('parsing failed', e)});

        dispatch({type: "SHOW_SEARCH_RES"});

      } else {
        alert("Please input search text");
        dispatch({
          type: "SEARCHRES",
          data: []
        });
      }

    },
    resizeWords: function(wordsWidth){
      dispatch({
        type: 'RESIZE_WORDS',
        data: wordsWidth
      })
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
    updateSlices: function(slices) {

      dispatch({
        type: 'UPDATE_SLICES',
        data: slices
      });
    },
    updateSelection: function(selectionItems){

      dispatch({
        type: 'UPDATE_RES_SELECTION',
        data: selectionItems
      });
    },
    multiSelect: (val, id) => {
      dispatch({type:"MULTISELECT", data:val, id:id});
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
