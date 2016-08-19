import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import {Responsive, WidthProvider} from 'react-grid-layout';
import React, { Component } from 'react';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
//import ReactGridLayout from 'react-grid-layout';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import renameBtn from './actions';
import 'whatwg-fetch';

class SearchGrid extends Component{

  constructor(props, context){
    super(props, context);
  }

  render() {

    return (
        <ResponsiveReactGridLayout
      className="layout"
      breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
      cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
        {this.props.children}
        </ResponsiveReactGridLayout>

    );
  }
}



class SearchBtn extends Component {
  constructor(props, context){
    super(props, context);
  }


  render() {
    console.dir(this.context);

    return (
        <RaisedButton
      label={this.context.name}
      onClick={() => this.context.rename()} />

    )

  }
}
SearchBtn.contextTypes = {
  name: React.PropTypes.any,
  rename: React.PropTypes.any,
};



//   <div key={'searchText'} data-grid={{ x: 0, y: 2, w: 2, h: 1, static: true }}>
//   <TextField
// hintText="Input your secret"
// fullWidth={true}/>
//   </div>

class SearchBar extends Component {
  constructor(props, context){
    super(props, context);
  }
  getChildContext(){
    return {
      name: this.props.name,
      rename: this.props.rename,
    }
  }
  //
  //
  //<div key={'searchBtn'} data-grid={{ x: 2, y: 2, w: 1, h: 1, static: true }}></div>
  render() {
    return (
        <MuiThemeProvider>
        <SearchGrid>
        <div key={'searchBtn'} data-grid={{ x: 2, y: 2, w: 1, h: 1, static: true }}>
        <SearchBtn /></div>
        </SearchGrid>
        </MuiThemeProvider>
    )
  }
}

SearchBar.childContextTypes = {
  name: React.PropTypes.any,
  rename: React.PropTypes.any,
};


let select = state => {return state};

function mapDispatchToProps(dispatch) {
  return {
    rename: function(){
      dispatch({
        type: "RENAME",
        data: "呵呵哒"
      });
    },
  };
}


export default connect(select, mapDispatchToProps)(SearchBar);
