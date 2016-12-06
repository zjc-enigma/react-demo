import {Editor, EditorState, RichUtils} from 'draft-js';
import React from 'react';
import ReactDOM from 'react-dom';


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
    backgroundColor: 'rgba(248, 222, 126, 1.0)',
    padding: '2px 0',
  },
};


class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.focus = () => this.refs.editor.focus();
  }


  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  //console.log('myeditor state', this.state);

  onBoldClick() {
    //alert("on bold Clicked");
    const selection = EditorState.selection;
    alert(selection);

    // const newState = RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD')
    // if (newState) {
    //   console.log('new state', newState)
    //   this.onChange(newState);
    //   return 'handled';
    // }
    // return 'not-handled';
  }

  render() {
    const {editorState} = this.state;
    return (
        <div style={styles.root}>
        <button
          onClick={() => this.onBoldClick()}
          style={styles.button}> Bold
        </button>

        <div style={styles.editor} onClick={this.focus}>
          <Editor
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            placeholder="Enter rich text"
            ref="editor"
          />
        </div>
        </div>
     );
  }
}

export default MyEditor
