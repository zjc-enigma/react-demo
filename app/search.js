import { connect } from 'react-redux';
import {Responsive, WidthProvider} from 'react-grid-layout';
import React, { Component } from 'react';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
//import ReactGridLayout from 'react-grid-layout';
import RaisedButton from 'material-ui/RaisedButton';
import Rename from './actions';


class SearchBar extends Component{

  constructor(props, context){

    super(props, context);
  }

  // getChildContext(){
  //   return {
  //     name: this.props.name,
  //     changeName: this.props.changeName,
  //   }
  // }
  render() {

    let layouts = {
      lg: [{ i: 'search', x: 6, y: 2, w: 1, h: 1, static: true}],
      md: [{ i: 'search', x: 6, y: 2, w: 1, h: 1, static: true}],
      sm: [{ i: 'search', x: 4, y: 2, w: 1, h: 1, static: true}],
      xs: [{ i: 'search', x: 2, y: 2, w: 1, h: 1, static: true}],
      xxs: [{ i: 'search', x: 1, y: 2, w: 1, h: 1, static: true}]
      };



    return (
        <ResponsiveReactGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
      cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>

        <div key={'search'} >
        <RaisedButton label="hehehehe" />
        </div>

      </ResponsiveReactGridLayout>
    );
  }
}

export default connect()(SearchBar);
