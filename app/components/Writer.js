import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import HorizontalLinearStepper from './HorizontalLinearStepper'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


// Object.prototype.isEmpty = function() {
//   for (var prop in this) if (this.hasOwnProperty(prop)) return false;
//   return true;
// };

let select = state => {return state.writer};

const mapDispatchToProps = (dispatch) => {
  let parseJson = response => {
    return response.json()
  }

  // let fetchToken = sentence => {
  //   fetch('/token',
  //         {method: "POST",
  //          headers:{
  //            'Accept': 'application/json',
  //            'Content-Type': 'application/json'},
  //          body: JSON.stringify({sentences: sentence})
  //         })
  //     .then(parseJson)
  //     .then(json => handleToken(json))
  //     .catch(function(e){console.log('parsing failed', e)})

  // }

  let handleToken = json => {

    dispatch({
      type: "TOKENED_SENTENCES",
      data: json
    })
  }

  return {
    updateLayouts: layouts => {
      dispatch({
        type: "UPDATE_LAYOUTS",
        data: layouts
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

@connect(select, mapDispatchToProps)
class Writer extends Component {
  constructor(props, context){
    super(props, context);
  }
  componentDidMount() {
    let s = ['农夫山泉是一家著名的饮料公司',]
    this.props.getSentencesTokened(s)
  }
  static defaultProps = {

  }

  componentWillReceiveProps(nextProps){

    let tokened = nextProps.tokened
    //console.log('tokened', tokened)

    if(this.props.layouts === undefined) {

      let wordsLayout = []

      let posY = 3
      for(let [i, sentence] of tokened.entries()){
        let posX = 0

        for(let [j, item] of sentence.entries()){

          console.log('word', item.word.length)
          wordsLayout.push({
            i:"word_" + i + "_" + j,
            x: posX,
            y: posY,
            w: 1,
            static:true
          })
          posX += item.word.length
        }
        posY += 0.2
      }

      let layouts = {lg:wordsLayout.concat([
        {i:"nextBtn", x: 6, y: 0.2, w: 1, h: 0.2, static:true},
        {i:"prevBtn", x: 5, y: 0.2, w: 1, h: 0.2, static:true},])}
      this.props.updateLayouts(layouts)
    }
  }

  render(){

    return (
        <MuiThemeProvider>
        <WriterGridLayout layouts={this.props.layouts}>
        <div key={'nextBtn'}> <NextBtn /> </div>
        <div key={'prevBtn'}> <PrevBtn /> </div>
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

