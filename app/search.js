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
import Checkbox from 'material-ui/Checkbox';
import {MultiSelect} from 'react-selectize';
import '../node_modules/react-selectize/themes/index.css';
import { Step, Stepper, StepLabel} from 'material-ui/Stepper';

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
    var rrr = ['bcasdafaf', 'sidfjaspifajsdf', '2312431'];
    this.props.steperNext(stepIndex, this.props.resTableSelection, rrr);
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
            <StepLabel>搜索文案</StepLabel>
          </Step>
          <Step>
            <StepLabel>替换关键词</StepLabel>
          </Step>
          <Step>
            <StepLabel>生成文案</StepLabel>
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
    var rrr = ['bcasdafaf', 'sidfjaspifajsdf', '2312431'];
    this.props.steperNext(this.props.stepIndex, this.props.resTableSelection, rrr);
  }
  render(){

    if(!this.props.hide){
      //console.log('wordsWidth', this.props.wordsWidth);
      return(
          <RaisedButton
        label={this.props.label}
        onClick={() => this.handler()} />
      )
    } else {
      return null;
    }
  }
}

class GenerateList extends Component {

  constructor(props, context){
    super(props, context);
  }

  render() {
    if(!this.props.hide){
      var sentenceList = [];
      var list = [];
      for(var index in this.props.sentenceData){
        sentenceList.push(this.props.sentenceData[index].sentence)
        console.log('sentence',this.props.sentenceData[index].sentence);
        console.log('id',this.props.sentenceData[index].id);
        list.push(<GenerateRes
                  changeGenerateText={this.props.changeGenerateText}
                  sentence={this.props.sentenceData[index].sentence}
                  init={this.props.sentenceData[index].init}
                  id={this.props.sentenceData[index].id} />)}

      //this.props.updateGenerateList(sentenceList);
      return (<div>
              {list}
              </div>);
    } else {
      return null;
    }
  }
}
class GenerateRes extends Component {

  constructor(props, context){
    super(props, context);
    this.handleChange(this.props.init)
  }
  handleChange(text){
    this.props.changeGenerateText(text, this.props.id)
  }
  //<li style="list-style-type:none">
  render(){
      return(
          <li style={{'list-style-type':'none'}}>
          <div style={{display:'inline'}}>
          <Checkbox defaultChecked={true}/>
          <TextField
        value={this.props.sentence}
        fullWidth={true}
        onChange={event => {var changeText = event.target.value;
                            this.handleChange(changeText)}}/>
          </div>
          </li>)
  }
}


class SearchGrid extends Component{
  static defaultProps = {
    searchTextWidth :6,
    searchTextHeight :0.2,
    searchBtnWidth : 1,
    searchBtnHeight :0.2,
    searchBtnY: 2,
    searchTextY: 2,
    searchResTableY: 8,
    generateResTableWidth: 7,
    generateResTableHeight: 0.5,
    prevBtnWidth: 0,
    prevBtnHeight: 0,
    nextBtnWidth: 0,
    nextBtnHeight: 0,
    nextBtnX: 11,
  }


  constructor(props, context){
    super(props, context);
  }

  shouldComponentUpdate (nextProps={}, nextState={}) {
    const thisProps = this.props || {};
    if (Object.keys(thisProps).length !== Object.keys(nextProps).length) {
      return true;
    }
    for (const key in nextProps) {
      if (is(thisProps[key], nextProps[key])) {
        return true;
      }
    }

    console.log('no changed');
    return false;
  }


  render() {
    var stepWidth = 0.4;
    var wordsLayouts = [];
    if(this.props.wordsLayouts){
      console.log('using wordslayouts', this.props.wordsLayouts)
      wordsLayouts = this.props.wordsLayouts;
    }

    // var totalIndex = 0;
    // for(var baseIndex in this.props.generateResult){
    //   var sentenceArray = this.props.generateResult[baseIndex];
    //   for (var arrayIndex in sentenceArray){
    //     wordsLayouts.push({
    //       i:"generateResTable_" +  baseIndex.toString() + "_" + arrayIndex.toString(),
    //       x:4,
    //       y:(1 + parseInt(totalIndex)),
    //       w:6,
    //       h:0.2, static:true});
    //     totalIndex += 1;
    //   }
    // }
    var layouts = {lg:wordsLayouts.concat(
      [{i:"steper", x: 5, y: 0, w: 4, h: 0.2, static:true},
       {i:"mt", x: 0, y: 0, w: 1, h: 0.2, static:true},
       {i:"searchText", x: 4,
        y: this.props.searchTextY,
        w: this.props.searchTextWidth,
        h: this.props.searchTextHeight, static:true},

       {i:"searchBtn", x: 10,
        y: this.props.searchBtnY,
        w: this.props.searchBtnWidth,
        h: this.props.searchBtnHeight, static:true},

       {i:"prevBtn", x: 6, y: 0.5,
        w: this.props.prevBtnWidth,
        h: this.props.prevBtnHeight, static:true},

       {i:"searchNextBtn",
        x: this.props.nextBtnX,
        y: 0.5,
        w: this.props.nextBtnWidth,
        h: this.props.nextBtnHeight,
        static:true},

       {i:"processBtn", x: 0, y: 0, w: 1, h: 0.2, static:true},
       {i:"searchResTable", x: 4,
        y: this.props.searchResTableY,
        w: this.props.searchResWidth,
        h: this.props.searchResHeight, static:true },

       {i:"generateResTable",
        x: 4,
        y: 1,
        w: this.props.generateResTableWidth,
        h: this.props.generateResTableHeight,
        static:true }]),
        // w: this.props.generateResTableWidth,
        // h: this.props.generateResTableHeight, static:true }]),

     md:wordsLayouts.concat(
       [{i:"steper", x: 5, y: 0, w: 4, h: 0.2, static:true},
        {i:"searchText", x: 5, y: 2, w: 4, h: 0.2, static:true},
        {i:"searchBtn", x: 9, y: 2, w: 1, h: 0.2, static:true},
        {i:"searchNextBtn", x: 10, y: 2, w: 1, h: 0.2, static:true},
        {i:"processBtn", x: 10, y: 2, w: 1, h: 0.2, static:true},
        {i:"searchResTable", x: 3, y: 0.8, w: 8, h: 1, static:true },
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

    console.log('updated layouts', layouts);
    return (
        <ResponsiveReactGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{lg: 800, md: 600, sm: 500, xs: 480, xxs: 0}}
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
    //this.context.searchQuery(text);
    this.props.searchQueryByClass(text, this.props.classSelection)
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
    //console.log('no changed');
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


  handleRowSelected(slices){
    if (slices === 'all') {
      this.props.updateGenerateSelection(this.props.searchRes);
    } else if  (slices.length === 0) {

      slices = this.props.slices;
      let selectedItems = slices.map(slice => {
        return this.props.searchRes[slice];

      });
      this.props.updateGenerateSelection(selectedItems);

    } else {

      this.props.updateSlices(slices);
      let selectedItems = slices.map(slice => {
        return this.props.searchRes[slice];

      });
      this.props.updateGenerateSelection(selectedItems);
    }

    //this.props.updateGenerateSelection()
  }
  render() {
    if(!this.props.hide){
      var rows = [];
      var generateRes = this.props.generateRes;

      for (var sentenceIndex in generateRes){
        var res = generateRes[sentenceIndex];
        for (var index in res){
          rows.push(
              <TableRow>
              <TableRowColumn>
              <TextField
            value={res[index]}
            fullWidth={true}/>
              </TableRowColumn>
              </TableRow>)
        }
      }

      return (
          <Table
        selectable={true}
        multiSelectable={true}
        onRowSelection={(slices) => this.handleRowSelected(slices)}
        onCellClick={() => {}}>
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
            <TableRowColumn>{searchRes[index].label}</TableRowColumn>
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
          <TableHeaderColumn>类目</TableHeaderColumn>
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
  }
  componentDidMount() {
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
    this.props.getMultiselectOption();

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
  // static defaultProps = {
  //   wordsLayouts:[],
  // }

  componentWillReceiveProps(nextProps){


    if(!this.props.wordsLayouts && this.props.stepIndex==1 && this.props.tokened != nextProps.tokened ){

      console.log(nextProps.tokened);
      var tokened = nextProps.tokened;
      var wordsArray = [];
      var wordsLayouts = [];
      for (var sentenceIndex in tokened){

        var demoWords = tokened[sentenceIndex];
        console.log("demowords", demoWords)
        var tmpStr = "";
        var xPos = 0;

        for (var index in demoWords){
          //console.log("tmpStr", tmpStr);
          var X = xPos;
          var Y = 1 + parseInt(sentenceIndex);

          if(demoWords[index].flag != "n"){
            tmpStr += demoWords[index].word
          } else {
            var wordComponentKey = "word_" + sentenceIndex.toString() + "_" + index.toString();
            var textKey = "text_" + sentenceIndex.toString() + "_" + index.toString();
            var wordComponentWidth = demoWords[index].word.length;
            var textWidth = tmpStr.length*0.2;

            wordsLayouts.push({i:textKey,
                               x: X,
                               y: Y,
                               w: textWidth,
                               h:0.2, static:true});

            wordsLayouts.push({i:wordComponentKey,
                               x: X + textWidth,
                               y: Y,
                               w: wordComponentWidth,
                               h:0.2, static:true});

            xPos += textWidth;
            xPos += wordComponentWidth;
            wordsArray.push(
                <div key={textKey} className={this.props.hideWriter ? 'hidden' : ''}>{tmpStr}</div>
            )
            wordsArray.push(
                <div key={wordComponentKey}
              className={this.props.hideWriter ? 'hidden' : ''}>
              <WordComponent
            holder={demoWords[index].word}
            disabled={demoWords[index].word.length<=1}
            value={eval("this.props.selected_" + sentenceIndex.toString() + "_"+ index.toString())}
            multiSelect={this.props.multiSelect}
            getSimWords={this.props.getSimWords}
            options={eval('this.props.simWords_' + sentenceIndex.toString() + "_" +index.toString())}
            id={sentenceIndex.toString() + "_" +index.toString()} /></div>)
            tmpStr = "";
          }

          if(index == demoWords.length - 1 && tmpStr.length>0){
            var textWidth = tmpStr.length*0.2;
            var textKey = "text_" + sentenceIndex.toString() + "_" + index.toString();
            wordsLayouts.push({i:textKey,
                               x: X,
                               y: Y,
                               w: textWidth,
                               h:0.2, static:true});
            wordsArray.push(
                <div key={textKey} className={this.props.hideWriter ? 'hidden' : ''}>{tmpStr}</div>
            )
          }
        }
      }
      console.log('words', wordsArray);
      console.log('wordslayouts', wordsLayouts);
      this.props.updateWords(wordsArray);
      this.props.updateWordsLayouts(wordsLayouts);
    }
  }
  render() {
    
    var words = [];
    if(this.props.wordsArray){
      //console.log("using wordsArray");
      words = this.props.wordsArray;
    }
    // for (var sentenceIndex in this.props.tokened){
    //   var demoWords = this.props.tokened[sentenceIndex];
    //   var sentencePos = 0;
    //   for (var index in demoWords){
    //     var wordWidth = this.props.wordsComponentWidth[sentenceIndex.toString() + "_" + index.toString()]
    //     //console.log('sentencePos', sentencePos);
    //     //wordWidth = (wordWidth? wordWidth : 1)*stepWidth;
    //     var width = wordWidth*stepWidth;
    //     wordsLayouts.push({i:"word_"+ sentenceIndex.toString() + "_" + index.toString(),
    //                        x:sentencePos,
    //                        y:(1 + parseInt(sentenceIndex)),
    //                        w: width,
    //                        h:0.2, static:true})
    //     sentencePos += width;
    //   }
    // }
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
      searchQueryByClass={this.props.searchQueryByClass}
      classSelection={this.props.classSelection}
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
      hide={this.props.hideNextBtn}/>
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
    //   <GenerateResTable
    // hide={this.props.hideGenerateRes} 
    // generateRes={this.props.generateResult}
    // updateGenerateSelection={this.props.updateGenerateSelection}/>
    //console.log('generateRes', this.props.generateResult);

    //<div key={'generateResTable_' + baseIndex.toString() + "_" + arrayIndex.toString()}>
    //   <GenerateRes
    // sentence={eval("this.props.generateText_" + baseIndex.toString() + "_" + arrayIndex.toString())}
    // changeGenerateText={this.props.changeGenerateText}
    // id={baseIndex.toString() + "_" + arrayIndex.toString()}
    // hide={this.props.hideGenerateRes}
    // init={sentence}
    //   />

    //</div>
    var sentenceData = [];
    for(var baseIndex in this.props.generateResult){
      var sentenceArray = this.props.generateResult[baseIndex];
      for (var arrayIndex in sentenceArray){
        var sentence = sentenceArray[arrayIndex];
        sentenceData.push({init:sentence,
                           id:baseIndex.toString() + "_" + arrayIndex.toString(),
                           sentence:eval("this.props.generateText_" + baseIndex.toString() + "_" + arrayIndex.toString())
                          });
      }
    }

    words.push(
        <div key={'generateResTable'}>
        <GenerateList
      sentenceData={sentenceData}
      changeGenerateText={this.props.changeGenerateText}
      updateGenerateList={this.props.updateGenerateList}
      hide={this.props.hideGenerateRes}
        /></div>
    )

    // var testoptions = ["apple",
    //                    "mango",
    //                    "grapes",
    //                    "melon",
    //                    "strawberry"].map(function(fruit){
    //                      return {label: fruit, value: fruit}
    // });

    words.push(
        <div key={'mt'}>
        <MultiSelect
      options={this.props.classOptions}
      onValuesChange = {values => this.props.updateClassSelection(values)}
      placeholder={"请选择投放类目"}>
        </MultiSelect></div>)

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
      searchBtnY={this.props.searchBtnY}
      searchTextY={this.props.searchTextY}
      searchResTableY={this.props.searchResTableY}
      wordsComponentWidth={this.props.wordsComponentWidth}
      generateResult={this.props.generateResult}
      wordsLayouts={this.props.wordsLayouts}
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
        wordsWidth[sentenceIndex.toString() + "_" + index.toString()] = demoWords[index].word.length;
      }
    }

    //console.log('wordsWidth', wordsWidth);
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
    steperNext: function(step,
                         selectedSentences,
                         generatedTextList){
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
        });
        dispatch({
          type: "SHOW_GENERATE_TABLE",
        });
        break;

      case 2:
        // fetch('/download',
        //       {method: "POST",
        //        headers:{
        //          'Accept': 'application/json',
        //          'Content-Type': 'application/json'},
        //        body: JSON.stringify({key: generateList})
        //       })
        //   .catch(function(e){console.log('parsing failed', e)});
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
    // .then(parseJson)
    // .then(showClick)
    //downloadGenerated(generatedTextList){
    //},
    changeGenerateText(text, id){
      dispatch({
        type: "CHANGE_GENERATE_TEXT",
        data: text,
        id: id
      });
    },

    searchQueryByClass: function(text, className){
      if(text){
        fetch('/query_by_class',
              {method: "POST",
               headers:{
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'},
               body: JSON.stringify({key: text, class_name: className})
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

      dispatch({
        type: "MOVE_SEARCH_BTN_TO_TOP",
      });
      dispatch({
        type: "MOVE_SEARCH_TEXT_TO_TOP",
      });
      dispatch({
        type: "MOVE_SEARCH_RES_TO_TOP",
      });
      dispatch({
        type: "SHOW_NEXT_BTN",
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

      dispatch({
        type: "MOVE_SEARCH_BTN_TO_TOP",
      });
      dispatch({
        type: "MOVE_SEARCH_TEXT_TO_TOP",
      });
      dispatch({
        type: "MOVE_SEARCH_RES_TO_TOP",
      });
      dispatch({
        type: "SHOW_NEXT_BTN",
      });
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
    getMultiselectOption: function(){
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
    updateGenerateSelection: function(selectionItems){
      dispatch({
        type: 'UPDATE_GENERATE_SELECTION',
        data: selectionItems
      });
    },
    updateGenerateList: function(generateList){
      dispatch({
        type: 'UPDATE_GENERATE_LIST',
        data: generateList
      });
    },
    updateClassSelection: function(selectionArray){
      dispatch({
        type: 'UPDATE_CLASS_SELECTION',
        data: selectionArray
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
    updateWords: (words) => {
      dispatch({type:"UPDATE_WORDS", data: words});
    },
    updateWordsLayouts: (layouts) => {
      dispatch({type:"UPDATE_WORDS_LAYOUTS", data: layouts});
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
