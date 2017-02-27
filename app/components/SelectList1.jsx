import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import React,{ Component } from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Avatar from 'material-ui/Avatar';
import {pinkA200, transparent} from 'material-ui/styles/colors';
import { withRouter } from 'react-router';
import '../css/selectList.scss';

{/* 第三 */}
class MyActionGrade extends Component {
  
  constructor(props, context){
    super(props, context);
    this.color = transparent;
  }

  componentWillReceiveProps(nextProps){
    if (this.props.selectedWords !== nextProps.selectedWords){
      let index = nextProps.selectedWords.indexOf(this.props.item)
      if(index > -1){
        this.color = pinkA200;
      } else {
        this.color = transparent;
      }
    }
  }

  render(){
    return(
      <ActionGrade color={this.color} />
    )

  }
}

class SelectList1 extends Component {

  constructor(props, context){
    super(props, context);
  }

  static defaultProps = {
    itemArray: {"": [
      "",
    ]},

  }

  _clickItem(item) {

  }

  generateListDom(){

    let listDomArray = []

    for(let [category, wordList] of Object.entries(this.props.itemArray)){

      for (let word of wordList){
        listDomArray.push(
          <ListItem
          primaryText={word}
          secondaryText={category}
          onClick={() => this.props.handleClick(word)} />)
          listDomArray.push(<Divider inset={true} />)
        }
    }
    return listDomArray
  }

  render(){
    return (
        <List style={{'width': '100%','height': '620'}}>
          {
            this.generateListDom()
          }
          </List>
    )
  }

}

export default withRouter(SelectList1)
