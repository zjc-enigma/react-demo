import { Editor, EditorState, RichUtils, convertFromRaw, CompositeDecorator } from 'draft-js';
import { Entity, Modifier } from 'draft-js';
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
    props.contentState.getEntity(props.entityKey).getMutability()
  );
  return (
    <span data-offset-key={props.offsetkey} style={style}>
      {props.children}
    </span>
  );
};

const getEntityStrategy = (mutability) => {

  return (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        if (entityKey === null) {
          return false;
        }
        return contentState.getEntity(entityKey).getMutability() === mutability;
      },
      callback
    );
  };
}

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];


class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle} style={styles.styleButton}>
        {this.props.label}
      </span>
    );
  }
}

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




class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.focus = () => this.refs.editor.focus();

    //const blocks = convertFromRaw(rawContent);
    this.state = {editorState: EditorState.createEmpty()};

    //this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.toggleInlineStyle = () => this._insertEntity()


    this.decorator = new CompositeDecorator([
      {
        strategy: getEntityStrategy('IMMUTABLE'),
        component: TokenSpan,
      },
      {
        strategy: getEntityStrategy('MUTABLE'),
        component: TokenSpan,
      },
      {
        strategy: getEntityStrategy('SEGMENTED'),
        component: TokenSpan,
      },
    ]);
  }


  _toggleInlineStyle(inlineStyle) {

    /* const selectionState = this.state.editorState.getSelection();
     * const start = selectionState.getStartOffset();
     * const end = selectionState.getEndOffset();
     * const block = this.state.editorState.getCurrentContent().getFirstBlock()
     * const selectedText = block.getText().slice(start, end)
     */

    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }
  _insertEntity() {
    const contentState = this.state.editorState.getCurrentContent()
    const targetRange = this.state.editorState.getSelection()
    const key = Entity.create('LINK', 'MUTABLE',  {href: 'www.google.com'});
    const contentStateWithLink = Modifier.applyEntity(
      contentState,
      targetRange,
      key
    )
    this.state = {
      editorState: EditorState.createWithContent(contentStateWithLink, this.decorator)
    }
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
      this.state = {
        editorState: EditorState.createWithContent(contentStateWithInsert)
      }
    }
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
  //placeholder="Enter rich text"
  render() {
    const {editorState} = this.state;
    return (
        <div style={styles.root}>
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div style={styles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            ref="editor"
          />
        </div>
        </div>
     );
  }
}

export default MyEditor
