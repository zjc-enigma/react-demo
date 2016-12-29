import { Editor, EditorState, RichUtils, convertFromRaw, CompositeDecorator, convertToRaw } from 'draft-js';
import RaisedButton from 'material-ui/RaisedButton';
import { Entity, Modifier } from 'draft-js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import { stateToHTML } from 'draft-js-export-html';
import { withRouter } from 'react-router';
import MyRadioButton from './RadioBtn'
import { connect } from 'react-redux';
import '../css/tempEditor.scss';


let mapStateToProps = state => ({
  ...state.writer,
  selectionRes: state.selection.totalSelection })

const mapDispatchToProps = dispatch => {

  return {
    updateEditorState: editorState => {
      console.log('dispatch editorstate:', editorState)
      dispatch({
        type: "UPDATE_TEMP_EDITOR_STATE",
        data: editorState
      })
    },
  }
}

//@connect(mapStateToProps, mapDispatchToProps)
class TempEditor extends React.Component {
  constructor(props) {
    super(props);
    //this.onChange = editorState => this.setState({editorState})
    //this.state = {editorState: EditorState.createEmpty()}
    let emptyState = EditorState.createEmpty()
    this.props.updateEditorState(emptyState)
    this.onChange = editorState => {
      this.props.updateEditorState(editorState)
    }
    this.focus = () => this.refs.tempEditor.focus();
  }

  render() {
    //const {editorState} = this.state;
    //console.log("PROPS:", this.props)
    const editorState = this.props.tempEditorState

    return (
      <MuiThemeProvider>
        <div>
          <div className="tempEditor">
            {
              editorState === undefined ? null :
              <Editor
                editorState={editorState}
                onChange={this.onChange}
                ref="tempEditor" />
            }
          </div>
          <div className="radioButton">
            <MyRadioButton onChange={this.props.clickRadioButton} />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}


export default withRouter(TempEditor)
