import { Editor, EditorState, RichUtils, convertFromRaw, CompositeDecorator } from 'draft-js';
import { Entity, Modifier } from 'draft-js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import '../css/editor.scss';

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
  styleButton: {
    color: '#999',
    cursor: 'pointer',
    marginRight: '16px',
    padding: '2px 0',
    display: 'inline-block',
  },
};



class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle();
    };
  }

  render() {
    let className = 'styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle} >
        {this.props.label}
      </span>
    );
  }
}

var INLINE_STYLES = [
  {label: '近义词', style: 'BOLD'},
  {label: '常用词', style: 'ITALIC'},
  {label: '行业词', style: 'UNDERLINE'},
  {label: '特征词', style: 'CODE'},
];



const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
       )}
    </div>
  );
};


class CreativeEditor extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = (editorState) => {
      //this.props.updateEditorState({editorState});
      this.setState({editorState})
    }
    this.state = {editorState: EditorState.createEmpty()}
    this.focus = () => this.refs.editor.focus();
  }


  componentWillReceiveProps(nextProps){

    console.log("nextProps", nextProps)
    if (this.props.insertText !== nextProps.insertText){
      this._insertText(nextProps.insertText)
    }
  }

  componentDidMount() {

  }

  _insertEntity(style) {

    const contentState = this.state.editorState.getCurrentContent()
    const targetRange = this.state.editorState.getSelection()
    const key = Entity.create('TOKEN', 'SEGMENTED');
    const contentStateWithEntity = Modifier.insertText(
      contentState,
      targetRange,
      "hehehe",
      null,
      key
    )
    this.onChange(
      EditorState.createWithContent(contentStateWithEntity, this.decorator)
    )
  }


  _getWordListWithSelection() {
    console.log("STATE", this.state)
    const t = this.state.editorState.getSelection()
    console.log(t.getText())


  }

  _insertText(text) {

    if (text) {
      const contentState = this.state.editorState.getCurrentContent()
      const targetRange = this.state.editorState.getSelection()
      const contentStateWithInsert = Modifier.insertText(
        contentState,
        targetRange,
        text
      )
      this.onChange(
        EditorState.createWithContent(contentStateWithInsert)
      )
    }
  }


  render() {
    const {editorState} = this.state;
    return (
      <MuiThemeProvider>
       <div style={styles.root}>
        <InlineStyleControls
          editorState={editorState}
          onToggle={() => this._getWordListWithSelection()}
        />
        <div className="editor" onClick={this.focus}>
            <Editor
              editorState={editorState}
              onChange={this.onChange}
              ref="editor"
             />
        </div>
       </div>
    
      </MuiThemeProvider>
    )
  }
}

export default CreativeEditor
