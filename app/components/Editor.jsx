import { Editor, EditorState, RichUtils, convertFromRaw, CompositeDecorator, convertToRaw } from 'draft-js';
import RaisedButton from 'material-ui/RaisedButton';
import { Entity, Modifier } from 'draft-js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { stateToHTML } from 'draft-js-export-html';
import { connect } from 'react-redux';
//import '../css/editor.scss';

const styles = {
  root: {
    fontFamily: '\'Helvetica\', sans-serif',
    //padding: 20,
    //width: 200,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    //minHeight: 80,
    //padding: 10,
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
      <span
        className={className}
        onMouseDown={this.onToggle}
        style={this.props.style}>
        {this.props.label}
      </span>
    );
  }
}

var INLINE_STYLES = [
  {label: '近义词', style: 'BOLD', color: 'red'},
  {label: '常用词', style: 'ITALIC', color: 'blue'},
  {label: '行业词', style: 'UNDERLINE', color: 'orange'},
  {label: '特征词', style: 'CODE', color: 'black'},
];


const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          style={{color: type.color}}
          key={type.label}
          label={type.label}
          onToggle={props.onToggle} />
       )}
    </div>
  );
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



let mapStateToProps = state => ({
  ...state.writer,
  selectionRes: state.selection.totalSelection })

const mapDispatchToProps = dispatch => {

  return {
    updateEditorState: editorState => {
      console.log('dispatch editorstate:', editorState)
      dispatch({
        type: "UPDATE_EDITOR_STATE",
        data: editorState
      })
    },
  }
}

//@connect(mapStateToProps, mapDispatchToProps)
class CreativeEditor extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = editorState => {
      this.props.updateEditorState(editorState);
      //this.setState({editorState})

    }
    //this.state = {editorState: EditorState.createEmpty()}
    let emptyState = EditorState.createEmpty()
    this.onChange(emptyState)
    this.focus = () => this.refs.editor.focus();

    this.decorator = new CompositeDecorator([
      {
        strategy: handleStrategy1,
        component: TokenSpan,
      },
    ]);

  }


  componentWillReceiveProps(nextProps){

    if (this.props.insertText !== nextProps.insertText){
      this._insertText(nextProps.insertText)
    }
    if (this.props.word !== nextProps.word) {
      this._insertEntity(nextProps.word)
    }


  }

  componentDidMount() {

  }

  _getPrevEntityKey() {
    // -1 for enter prev entity range
    const selection = this.state.editorState.getSelection()
    const contentState = this.state.editorState.getCurrentContent()
    const offset = selection.getStartOffset() > 0 ? selection.getStartOffset() - 1 : 0
    const currentBlock = contentState.getBlockForKey(selection.getStartKey())
    const entityKey = currentBlock.getEntityAt(offset)
    console.log("prev offset:", offset)
    console.log("prev entity key:", entityKey)

    return entityKey;
  }

  _insertEntity(text) {

    const contentState = this.state.editorState.getCurrentContent()
    const targetRange = this.state.editorState.getSelection()
    let newEntityKey = Entity.create('TOKEN', 'SEGMENTED');
    console.log('new entity key:', newEntityKey)

    //console.log('targeRange:', targetRange)
    //console.log("char list:", currentBlock.getCharacterList())
    //console.log("prev key:", selection.getStartKey())

    /* const prevEntityKey = this._getPrevEntityKey()
     * if(prevEntityKey !== null){
     *   let prevEntity = Entity.get(prevEntityKey)
     *   let newEntity = Entity.get(newEntityKey)
     *   //console.log('prev Entity mutability', prevEntity.getMutability())
     *   //console.log('prev Entity type:', prevEntity.getType())
     *   //console.log('prev Entity data:', prevEntity.getData())
     *   //console.log('prev Entity mutability:', prevEntity.getMutibility())
     *   if (prevEntity.getMutability() === newEntity.getMutability()) {
     *     Entity.mergeData(newEntityKey, prevEntityKey)
     *   }
     * }*/

    const contentStateWithEntity = Modifier.replaceText(
      contentState,
      targetRange,
      text,
      null,
      newEntityKey
    )

    this.onChange(
      EditorState.moveSelectionToEnd(
        EditorState.createWithContent(
          contentStateWithEntity,
          this.decorator))
    )
  }

  _insertSelectedWordsAsEntity(){

    if(this.props.selectedWords){
      const joinedWords = this.props.selectedWords.join('|')
      this._insertEntity(joinedWords)
    }
  }

  _getWordListWithSelection() {
    // get selection text
    console.log('on select')
    const contentState = this.state.editorState.getCurrentContent()
    const selectionState = this.state.editorState.getSelection();
    const start = selectionState.getStartOffset();
    const end = selectionState.getEndOffset();
    //const block = this.state.editorState.getCurrentContent().getFirstBlock()
    const block = contentState.getBlockForKey(selectionState.getStartKey())
    const selectedText = block.getText().slice(start, end)
    this.props.getWordList(selectedText, "DEFAULT")
    this.props.cleanSelectedWords()

  }

  _exportAllContent(){
    const contentState = this.state.editorState.getCurrentContent()
    const raw = convertToRaw(contentState);
    this.props.exportToServerAndSave(raw);
    this.props.history.push('/generate_res_table')
  }

  _exportToHtml(){
    const contentState = this.state.editorState.getCurrentContent()
    const html = stateToHTML(contentState);
    console.log('export to html:', html)

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
        EditorState.moveSelectionToEnd(
          EditorState.createWithContent(
            contentStateWithInsert,
            this.decorator))
      )
    }

  }


  render() {
    const editorState = this.props.editorState
    //<div style={styles.root}>
    //</div>
    return (
      <MuiThemeProvider>
        <div
          className="editor"
          onSelect={() => {}}>
          {editorState === undefined ? null :
           <Editor
             editorState={editorState}
             onChange={this.onChange}
             ref="editor"/>
          }
        </div>
    
      </MuiThemeProvider>
    )
  }
}

export default CreativeEditor
