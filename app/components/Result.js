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


let mapStateToProps = state => ({ state: state.result,
                                  writerRes: state.writer.selection})



const mapDispatchToProps = dispatch => {
  return {
    updateSelection: selection => {
      dispatch({
        type: "UPDATE_SELECTED_RES",
        data: selection
      })
    }
  }
}


@connect(mapStateToProps, mapDispatchToProps)
class Result extends Component {
  constructor(props, context){
    super(props, context);
  }

  static defaultProps = {
    writerRes : ["撒佛教啤酒瓶", "加啤酒匹配就玩儿"],
  }

  nextStep(){
    //this.props.history.push('/writer')
  }
  render() {
    return (
        <MuiThemeProvider>
        <div key={'resultTable'}>
        <ResultTable
      writerRes={this.props.writerRes} />
        </div>
        </MuiThemeProvider>
    )
  }
}

class ResultTable extends Component {

  constructor(props, context){
    super(props, context)
  }
  componentWillReceiveProps(nextProps){

  }

  mapWordToSentence(){
    let sentenceArray = []
    for(var wordArray of this.props.writerRes){

      let tmp = wordArray[0]
      for(var wordItem of wordArray.slice(1, wordArray.length)){
        let tt = []
        for (var word of wordItem){
          for(var t of tmp){
            tt.push(t + word)
          }
        }
        tmp = tt.slice()
      }
      sentenceArray.push(tmp)
    }
    return sentenceArray
  }
  generateRows(){

    let sentenceArray = this.mapWordToSentence()
    return sentenceArray.length === 0 ?
      null : sentenceArray.map(sentence => sentence.map(s => <TableRow>
                                                        <TableRowColumn>{'标签'}</TableRowColumn>
                                                        <TableRowColumn>{'头条'}</TableRowColumn>
                                                        <TableRowColumn>{'测试'}</TableRowColumn>
                                                        <TableRowColumn style={{width:'60%'}}>{s}</TableRowColumn>
                                                        </TableRow>))
  }


  handleSelection(slices) {
    let selection = slices.map(index => {return this.props.writerRes[index]})
    this.props.updateSelection(selection)
  }

  render() {

    return(
        <Table
      selectable={true}
      multiSelectable={true}
      onRowSelection={slices => this.handleSelection(slices)}>
        <TableHeader>
        <TableRow>
        <TableHeaderColumn>类别</TableHeaderColumn>
        <TableHeaderColumn>来源</TableHeaderColumn>
        <TableHeaderColumn>类目</TableHeaderColumn>
        <TableHeaderColumn style={{width: '60%'}}>内容</TableHeaderColumn>
        </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false}>
        {this.generateRows()}
      </TableBody>
        </Table>
    )
  }
}


class ResultGridLayout extends Component {

  constructor(props, context){
    super(props, context);
  }
  componentDidMount() {

  }
  render(){
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

export default Result
