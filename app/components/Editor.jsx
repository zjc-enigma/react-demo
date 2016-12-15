import { Editor, EditorState, RichUtils, convertFromRaw, CompositeDecorator } from 'draft-js';
import { Entity, Modifier } from 'draft-js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import '../css/editor.scss';


class CreativeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = (editorState) => this.setState({editorState});
    this.state = {editorState: EditorState.createEmpty()};
  }

  render() {
    const {editorState} = this.state;

    return (
      <MuiThemeProvider>
        <div className={"editor"}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            ref="editor"
        />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default CreativeEditor
