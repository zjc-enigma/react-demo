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
import TempEditor from './TempEditor';
import { Entity, Modifier } from 'draft-js';
import { Editor, EditorState, RichUtils, convertFromRaw, CompositeDecorator, convertToRaw } from 'draft-js';

let mapStateToProps = state => ({
  ...state.writer,
  selectionRes: state.selection.totalSelection })



const styles = {
  root: {
    fontFamily: '\'Helvetica\', sans-serif',
    padding: 20,
    width: 600,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  immutable: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: '2px 0',
  },
  mutable: {
    backgroundColor: 'rgba(204, 204, 255, 1.0)',
    padding: '2px 0',
  },
  segmented: {
    borderRadius: '15px',
    backgroundColor: 'rgba(248, 222, 126, 1.0)',
    padding: '2px 0',
  },
  styleButton: {
    color: '#999',
    cursor: 'pointer',
    marginRight: '16px',
    padding: '2px 0',
    display: 'inline-block',
  },
};



const getDecoratedStyle = (mutability) => {
  switch (mutability) {
    case 'IMMUTABLE': return styles.immutable;
    case 'MUTABLE': return styles.mutable;
    case 'SEGMENTED': return styles.segmented;
    default: return null;
  }
};


const TokenSpan = (props) => {
  const style = getDecoratedStyle(
    Entity.get(props.entityKey).getMutability()
  );
  return (
    <span {...props} style={style}>
      {props.children}
    </span>
  );
};


const handleStrategy1 = (contentBlock, callback) => {
  console.log('contentBlock content:', contentBlock.getText())
  contentBlock.findEntityRanges(
    (char) => {
      const entityKey = char.getEntity()
      //console.log("entitykey type:", Entity.get(entityKey).getType())
      return(
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'TOKEN'
      )
    },
    callback
  )
}




const mapDispatchToProps = dispatch => {

  const updateWordList = json => {
    dispatch({
      type: "GET_WORD_LIST",
      data: json})
  }

  const updateGenerateRes = json => {
    console.log(json)
    dispatch({
      type: "GENERATE_RES_LIST",
      data: json
    })
  }

  const decorator = new CompositeDecorator([
    {
      strategy: handleStrategy1,
      component: TokenSpan,
    },
  ]);


  return {
    updateEditorState: editorState => {
      dispatch({
        type: "UPDATE_EDITOR_STATE",
        data: editorState
      })
    },

    handleClick: item => {
      dispatch({
        type: "ON_CLICK_LIST_INSERT_TEXT",
        data: item
      })
    },
    handleClickWord: item => {
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
    exportToServerAndSave: raw => {
      fetch("/export_raw",
        {method: "POST",
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
          body: JSON.stringify({raw: raw})
        })
        .then(res => res.json())
        .then(updateGenerateRes)
        .catch(function(e){console.log('/export_raw parsing failed', e)})

    },
    updateTableSelection: selection => {
      dispatch({
        type: "UPDATE_WORDS_TABLE_SELECTION",
        data: selection
      })
    },
    onCheck: (e, isChecked, label) => {
      dispatch({
        type: "ADD_OR_REMOVE_CLASS_BY_CHECKBOX",
        label: label,
        isChecked: isChecked
      })
      console.log(label, isChecked)
    },

    tempEditorOnChange: editorState => {
      dispatch({
        type: "UPDATE_TEMP_EDITOR_STATE",
        data: editorState
      })
    },

    clickRadioButton: value => {
      dispatch({
        type: "UPDATE_RADIO_VALUE",
        data: value
      })
    },

    insertTextToEditor: item => {
      dispatch({
        type: "INSERT_TEXT_TO_EDITOR",
        data: item,
        decorator: decorator
      })
    },

    insertTextToTempEditor: item => {
      dispatch({
        type: "INSERT_TEXT_TO_TEMP_EDITOR",
        data: item,
        decorator: decorator
      })
    },

    getWordListWithSelection: editorState => {

      const contentState = editorState.getCurrentContent()
      const selectionState = editorState.getSelection();
      const start = selectionState.getStartOffset();
      const end = selectionState.getEndOffset();
      const block = contentState.getBlockForKey(selectionState.getStartKey())
      const selectedText = block.getText().slice(start, end)
      console.log('selected Text', selectedText)

      fetch("/simwords",
        {method: "POST",
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
          body: JSON.stringify({base_word: selectedText})
        })
        .then(res => res.json())
        .then(updateWordList)
        .catch(function(e){console.log('/simwords parsing failed', e)})
      //this.props.cleanSelectedWords()
    }
  }
}



@connect(mapStateToProps, mapDispatchToProps)
class Writer extends Component {

  constructor(props, context){
    super(props, context);
  }

  handleGetWordBtnClick = () => {
    this.props.getWordListWithSelection(this.props.editorState)
  }


  render() {
    const {clickRadioButton} = this.props
    return (
      <MuiThemeProvider>
      <div className={"sentenceWriter"}>
        <div className={"sentenceTable"}>
          <SelectList
            itemArray={this.props.selectionRes}
            handleClick={this.props.insertTextToEditor} />
        </div>

        <div className={"editorArea"}>
          <div className={'tempEditor'}>
            <TempEditor
              clickRadioButton={clickRadioButton}
              tempEditorState={this.props.tempEditorState}
              updateEditorState={this.props.tempEditorOnChange} />

          </div>
          <div className={"classCheckBox"}>
            {/* {this.props.isGotClassname &&
                this.props.allClassNameList.map(
                item => 
                <MyCheckBox
                checkedList={this.props.checkedClassList}
                label={item}
                onCheck={this.props.onCheck} />)
                } */}
          </div>
          <div className={"sentenceEditor"}>
            <CreativeEditor
              editorState={this.props.editorState}
              insertText={this.props.insertText}
              word={this.props.word}
              selectedWords={this.props.selectedWords}
              getWordList={this.props.getWordList}
              cleanSelectedWords={this.props.cleanSelectedWords}
              editorState={this.props.editorState}
              updateEditorState={this.props.updateEditorState}
              exportToServerAndSave={this.props.exportToServerAndSave}
              history={this.props.history} />
          </div>
        </div>
        <div className={"getWordBtn"}>
          <RaisedButton
            label={"Get words"}
            onClick={() => this.props.getWordListWithSelection(this.props.editorState)} />

        </div>

        <div className={"wordsSelectionTable"}>
          <SelectList
            itemArray={this.props.wordList}
            handleClick={this.props.insertTextToTempEditor} />

        </div>
      </div>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(Writer)
//selectedWords={this.props.selectedWords}
//updateTableSelection={this.props.updateTableSelection}
//wordsSelection={this.props.wordsSelection}

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
