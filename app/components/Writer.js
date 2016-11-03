import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import HorizontalLinearStepper from './HorizontalLinearStepper'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {Responsive, WidthProvider} from 'react-grid-layout'
const ResponsiveReactGridLayout = WidthProvider(Responsive)
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {MultiSelect} from 'react-selectize'

// Object.prototype.isEmpty = function() {
//   for (var prop in this) if (this.hasOwnProperty(prop)) return false;
//   return true;
// };

let select = state => ({ ...state.writer,
                         selectionRes: state.selection.selectionRes})


const mapDispatchToProps = (dispatch) => {
  let parseJson = response => {
    return response.json()
  }

  let handleToken = json => {

    dispatch({
      type: "TOKENED_SENTENCES",
      data: json
    })
  }
  let updateSimWords = function(json, word) {
    //console.log(word)
    dispatch({
      type: "UPDATE_SIM_WORDS",
      data: json,
      word: word

    })

  }

  return {

    getSimWords: (word) => {
      //console.log('word',word)
      fetch("/simwords",
            {method: "POST",
             headers:{
               'Accept': 'application/json',
               'Content-Type': 'application/json'},
             body: JSON.stringify({base_word: word})
            })
        .then(parseJson)
        .then(json => updateSimWords(json, word))
        .catch(function(e){console.log('/simwords parsing failed', e)})
    },
    updateLayouts: layouts => {
      console.log('update layouts', layouts)
      dispatch({
        type: "UPDATE_LAYOUTS",
        data: layouts
      })
    },
    updateWordEditors: editors => {
      //console.log('editors', editors)
      dispatch({
        type: "UPDATE_EDITORS",
        data: editors
      })
    },

    updateSentenceArray: sentenceArray => {
      dispatch({
        type: "UPDATE_SENTENCE_ARRAY",
        data: sentenceArray
      })
    },
    getSentencesTokened: sentenceArray => {
      fetch('/token',
            {method: "POST",
             headers:{
               'Accept': 'application/json',
               'Content-Type': 'application/json'},
             body: JSON.stringify({sentences: sentenceArray})
            })
        .then(parseJson)
        .then(json => handleToken(json))
        .catch(function(e){console.log('parsing failed', e)});
    }
  }
}

class WordEditor extends Component {

  constructor(props, context){
    super(props, context);
  }
  componentDidMount() {
    //this.props.getSimWords(this.props.default, this.props.divKey)
  }

  componentWillReceiveProps(nextProps){


  }

  getOptions(){
    let simArray = this.props[this.props.default]
    return simArray
  }

  render() {
    let width = this.props.wordWidth*100


    return (
        <MultiSelect
      options={this.getOptions()}
      onValuesChange = {() => {}}
      placeholder={this.props.default}
      theme={"material"}
      style={{width: width}}>
        </MultiSelect>
    )
  }
}


class SentenceEditorArray extends Component {
  static defaultProps = {
    tokened : []
  }
  constructor(props, context){
    super(props, context);
  }
  componentDidMount() {
    // let layouts = {lg:[
    //   {i:"nextBtn", x: 6, y: 0.2, w: 1, h: 0.2, static:true},
    //   {i:"prevBtn", x: 5, y: 0.2, w: 1, h: 0.2, static:true},]}
    // this.props.updateLayouts(layouts)

  }

  componentWillReceiveProps(nextProps){

    if(this.props.tokened != nextProps.tokened) {
      let sentenceArray = []
      for(let [i, sentence] of nextProps.tokened.entries()){
        sentenceArray.push(<SentenceEditor sentence={sentence} index={i} {...this.props} />)
      }
      this.props.updateSentenceArray(sentenceArray)

    }
  }
  render() {
    
    return(
      <div>
        {this.props.tokened.map((sentence, index) =>
                                <SentenceEditor
                                sentence={sentence}
                                index={index}
                                {...this.props} />)}
      </div>)
  }


}


class SentenceEditor extends Component {

  constructor(props, context){
    super(props, context);
  }
  componentDidMount() {
   
    for(let [j, item] of this.props.sentence.entries()) {
      // let divKey = "word_" + this.props.index + "_" + j
      let word = item.word
      let flag = item.flag
      // let wordWidth = word.length*widthStep
      this.props.getSimWords(word)

      //posX += wordWidth
    }

    //this.props.updateLayouts(wordsLayout)
  }
  componentWillReceiveProps(nextProps){

  }

  generateLayouts(){

    let wordsLayout = []
    let widthStep = 0.5
    let posY = this.props.index*0.2
    let posX = 0

    for(let [j, item] of this.props.sentence.entries()) {
      let divKey = "word_" + this.props.index + "_" + j
      let word = item.word
      let flag = item.flag

      let wordWidth = word.length*widthStep
      let fixX = 0
      let fixY = 0
      let fixWidth = -0.01
      if(word.length === 1) {
        wordWidth=0.12
        fixX = 0
        fixY = 0.06
      }
      wordsLayout.push({
        i: divKey,
        x: posX + fixX,
        y: posY + fixY,
        w: wordWidth + fixWidth,
        h: 0.05,
        static:true})

      posX += wordWidth
    }

    return {lg:wordsLayout}
  }

  render() {

    return(
        <ResponsiveReactGridLayout
      layouts={this.generateLayouts()}
      breakpoints={{lg: 800, md: 600, sm: 500, xs: 480, xxs: 0}}
      cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}} >
        {this.props.sentence.map((wordItem, index) =>
                                 <div key={"word_" + this.props.index + "_" + index}>
                                 {wordItem.word.length === 1? wordItem.word : (
                                     <WordEditor
                                   default={wordItem.word}
                                   wordWidth={wordItem.word.length*0.5}
                                   {...this.props}  />)}
                                 </div>)}
      </ResponsiveReactGridLayout>)
  }
}


@connect(select, mapDispatchToProps)
class Writer extends Component {
  constructor(props, context){
    super(props, context);
  }
  componentDidMount() {
    //let s = ["农夫山泉是一家饮料公司", ]
    //this.props.getSentencesTokened(s)
    this.props.getSentencesTokened(this.props.selectionRes)
  }
  static defaultProps = {
    editors : [],
    layouts : []
  }
  componentWillReceiveProps(nextProps){
    let wordsLayout = []
    let wordsEditors = []


    if(nextProps.tokened != undefined && this.props.layouts == undefined) {
      let tokened = nextProps.tokened


      // let widthStep = 0.5
      // let posY = 1
      // for(let [i, sentence] of tokened.entries()){
      //   let posX = 0

      //   for(let [j, item] of sentence.entries()){

      //     let divKey = "word_" + i + "_" + j
      //     let word = item.word
      //     let flag = item.flag
      //     let wordWidth = word.length*widthStep
      //     word.length === 1 ? wordsEditors.push(<div key={divKey}>
      //                                           {word}
      //                                           </div> ) :
      //     //getSimWords={this.props.getSimWords}
      //       wordsEditors.push(<div key={divKey}>
      //                         <WordEditor
      //                         default={word}
      //                         wordWidth={wordWidth}
      //                         divKey={divKey}
      //                         {...this.props}
      //                         />
      //                         </div>)
      //     wordsLayout.push({
      //       i: divKey,
      //       x: posX,
      //       y: posY,
      //       w: wordWidth,
      //       h: 0.05,
      //       static:true
      //     })
      //     posX += wordWidth
      //   }
      //   posY += 0.2
      // }
      // let wordsLayout = []
      // this.props.updateWordEditors(wordsEditors)
    }
  }

  generateDom(){
    return (
        <div key={'sentenceArray'}>
        {this.props.tokened === undefined ? null : (<SentenceEditorArray {...this.props} />)}
      </div>)
  }
  render(){
    //let layouts = this.props.layouts
    //let wordsEditors = this.props.editors

    let layouts = {lg:this.props.layouts.concat([
      {i:"nextBtn", x: 6, y: 0.2, w: 1, h: 0.2, static:true},
      {i:"prevBtn", x: 5, y: 0.2, w: 1, h: 0.2, static:true},
      {i:"sentenceArray", x: 0, y:0.8, w: 12, h: 0.2, static:true}])}

    // this.props.updateLayouts(layouts)

    // {React.cloneElement(wordsEditors, {...this.props})}
    //console.log('tokened', this.props.tokened)
    //{wordsEditors}

    // tokened={this.props.tokened}
    // simWords={this.props.simWords}
    // updateLayouts={this.props.updateLayouts}
    // updateSentenceArray={this.props.updateSentenceArray}
    // sentenceArray={this.props.sentenceArray}
    //console.log('token', this.props)

    return (
      
        <MuiThemeProvider>
        <WriterGridLayout layouts={layouts}>
        <div key={'nextBtn'}> <NextBtn /> </div>
        <div key={'prevBtn'}> <PrevBtn /> </div>
        {this.generateDom()}
        </WriterGridLayout>
        </MuiThemeProvider>

    )
  }
}

class NextBtn extends Component {
  constructor(props, context){
    super(props, context);
  }
  static defaultProps = {
    label: "Next step"
  }

  render() {
    return(
        <RaisedButton
      fullWidth={true}
      label={this.props.label}
      onClick={() => {}} />
    )
  }
}


class PrevBtn extends Component {
  constructor(props, context){
    super(props, context);

  }

  static defaultProps = {
    label: "Prev step"
  }

  render() {
    return(
        <RaisedButton
      fullWidth={true}
      label={this.props.label}
      onClick={() => {}} />
    )
  }
}






class WriterGridLayout extends Component {
  constructor(props, context){
    super(props, context);
  }
  static defaultProps = {

  }
  componentDidMount() {
  }

  render() {

    return (
        <ResponsiveReactGridLayout
      layouts={this.props.layouts}
      breakpoints={{lg: 800, md: 600, sm: 500, xs: 480, xxs: 0}}
      cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
        {this.props.children}
      </ResponsiveReactGridLayout>
    )
  }
}




export default Writer











