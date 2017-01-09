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
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Avatar from 'material-ui/Avatar';
import {pinkA200, transparent} from 'material-ui/styles/colors';
import { withRouter } from 'react-router';
import '../css/selectList.scss';


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



class SelectList extends Component {

  constructor(props, context){
    super(props, context);
  }

  static defaultProps = {
    itemArray: {"similar": [
      "发生发生的发生的发生地方",
      "阿斯顿发送到发送到付家坡",
      "我奖品为进排气尾聘请为毛坯房的撒"
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
        }
    }
    return listDomArray
  }

  render(){

    return (
        <List style={{'width': '100%'}}>
          {
            this.generateListDom()
          }
          </List>
    )
  }

}

export default withRouter(SelectList)
