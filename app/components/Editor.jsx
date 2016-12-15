import { Editor, EditorState, RichUtils, convertFromRaw, CompositeDecorator } from 'draft-js';
import { Entity, Modifier } from 'draft-js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import '../css/editor.scss';


class CreativeEditor extends React.Component {

  constructor(props) {
    super(props);
    //this.onChange = (editorState) => this.props.updateEditorState({editorState});
    //const initState = EditorState.createEmpty();
    //this.props.updateEditorState(initState);

  }

  componentDidMount() {

  }

  render() {
    //const {editorState, updateEditorState} = this.props;

    //const editorState = this.props.editorState;
    //console.log('editorState in render:', editorState)

    return (
      <MuiThemeProvider>
        <Editor
          editorState={EditorState.createEmpty()}
          onChange={this.onChange}
          ref="editor"
        />
      </MuiThemeProvider>
    )
  }
}
/* 
 * {
 *   editorState === undefined ? null :
 *   <Editor
 *                                        editorState={editorState}
 *                                        onChange={this.onChange}
 *                                        ref="editor"
 *                                      />
 * }*/

export default CreativeEditor
