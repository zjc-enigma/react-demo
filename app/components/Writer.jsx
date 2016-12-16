import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import HorizontalLinearStepper from './HorizontalLinearStepper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {MultiSelect} from 'react-selectize';
import SelectList from './SelectList';
import { withRouter } from 'react-router';
import CreativeEditor from './Editor';
import '../css/writer.scss';


let mapStateToProps = state => ({
  ...state.writer,
  selectionRes: state.selection.selectionRes })

const mapDispatchToProps = (dispatch) => {

  const updateWordList = (json) => {
    console.log(json)
    dispatch({
      type: "GET_WORD_LIST",
      data: json})
  }


  return {
    updateEditorState: (editorState) => {
      dispatch({
        type: "UPDATE_EDITOR_STATE",
        data: editorState
      })
    },

    handleClick: (item) => {
      dispatch({
        type: "ON_CLICK_LIST_INSERT_TEXT",
        data: item
      })
    },
    handleClickWord: (item) => {
      dispatch({
        type: "ON_CLICK_WORD_LIST",
        data: item
      })
    },
    getWordList: (word, cate) => {

      fetch("/simwords",
        {method: "POST",
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
          body: JSON.stringify({base_word: word})
        })
        .then(res => res.json())
        .then(updateWordList)
        .catch(function(e){console.log('/simwords parsing failed', e)})

    }
  }
}



@connect(mapStateToProps, mapDispatchToProps)
class Writer extends Component {

  constructor(props, context){
    super(props, context);
   }

  render() {
    //console.log(this.props.handleClick)
    return (
      <div className={"writer"}>
        <SelectList
          className={"sentenceList"}
          itemArray={this.props.selectionRes}
          editorState={this.props.editorState}
          handleClick={this.props.handleClick} />

        <CreativeEditor
          className={"editor"}
          insertText={this.props.insertText}
          word={this.props.word}
          getWordList={this.props.getWordList}
          editorState={this.props.editorState}
          updateEditorState={this.props.updateEditorState} />

        <SelectList
          className={"wordList"}
          itemArray={this.props.wordList}
          editorState={this.props.editorState}
          handleClick={this.props.handleClickWord} />


      </div>
    )
  }

}

export default withRouter(Writer)
