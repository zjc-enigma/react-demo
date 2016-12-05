import {Editor, EditorState, RichUtils} from 'draft-js';
import React from 'react';
import ReactDOM from 'react-dom';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);

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
    return (<div>
            <button onClick={() => this.onBoldClick()}>Bold</button>
            <Editor
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            />
            </div>
           );
  }
}

export default MyEditor
