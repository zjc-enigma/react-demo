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
import SelectList from './SelectList';
import SelectTable from './SelectTable'
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

    },
    cleanSelectedWords: () => {
      dispatch({
        type: "CLEAN_SELECTED_WORDS",
      })
    },
    exportToServerAndSave: (raw) => {
      fetch("/export_raw",
        {method: "POST",
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
          body: JSON.stringify({raw: raw})
        })
        .then(res => res.json())
        .catch(function(e){console.log('/export_raw parsing failed', e)})
    },
    updateTableSelection: (selection) => {
      dispatch({
        type: "UPDATE_WORDS_TABLE_SELECTION",
        data: selection
      })
    }
  }
}



@connect(mapStateToProps, mapDispatchToProps)
class Writer extends Component {

  constructor(props, context){
    super(props, context);
   }

  render() {

    return (
      <MuiThemeProvider>
      <div className={"sentenceWriter"}>
        <div className={"sentenceTable"}>
          <SelectList
            itemArray={this.props.selectionRes}
            handleClick={this.props.handleClick} />
        </div>

        <div className={"sentenceEditor"}>
          <CreativeEditor
            insertText={this.props.insertText}
            word={this.props.word}
            selectedWords={this.props.selectedWords}
            getWordList={this.props.getWordList}
            cleanSelectedWords={this.props.cleanSelectedWords}
            editorState={this.props.editorState}
            updateEditorState={this.props.updateEditorState}
            exportToServerAndSave={this.props.exportToServerAndSave} />
        </div>

        <div className={"wordsSelectionTable"}>
          <SelectTable 
            itemArray={this.props.wordList}
            handleClick={this.props.handleClickWord}
            selectedWords={this.props.selectedWords}
            updateTableSelection={this.props.updateTableSelection}
            wordsSelection={this.props.wordsSelection}  />
        </div>
      </div>
      </MuiThemeProvider>
 
    )
  }

}








export default withRouter(Writer)

/* <SelectList
 * className={"sentenceList"}
 * itemArray={this.props.selectionRes}
 * editorState={this.props.editorState}
 * handleClick={this.props.handleClick} />
 * 
 * <CreativeEditor
 * className={"editor"}
 * insertText={this.props.insertText}
 * word={this.props.word}
 * selectedWords={this.props.selectedWords}
 * getWordList={this.props.getWordList}
 * cleanSelectedWords={this.props.cleanSelectedWords}
 * editorState={this.props.editorState}
 * updateEditorState={this.props.updateEditorState}
 * exportToServerAndSave={this.props.exportToServerAndSave} />
 * 
 * <SelectList
 * className={"words"}
 * itemArray={this.props.wordList}
 * editorState={this.props.editorState}
 * handleClick={this.props.handleClickWord}
 * selectedWords={this.props.selectedWords} />*/
