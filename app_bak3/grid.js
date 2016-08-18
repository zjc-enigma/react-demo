import ReactGridLayout from 'react-grid-layout';
import React, { Component, PropTypes } from 'react';
import { Provider, connect } from 'react-redux';

class MyGrid extends Component{

  render() {

    const { res } = this.props;
    console.dir(res);
    let layout = [];
    let index = 0;
    { for (let r in res) {
      let item = { i: res[r].k,
                   x: index,
                   y: 0,
                   w: 5,
                   h: 5 };
      layout.push(item);
      index += 5;
    } }

    return (<ReactGridLayout
            className="layout"
            layout={layout}
            cols={23}
            rowHeight = {5}
            width={1200}>

            {res.map(
              function(rt){
                return(<div key={rt.k}>{rt.v}</div>)}
            )}
            </ReactGridLayout>
           );
  }
}



class BaseGrid extends Component{

  render() {

    const { res } = this.props;
    let layout = [];

    let searchButtonItem = {
      i: res.searchButton.name,
      x: 0,
      y: 0,
      w: 5,
      h: 5 };

    let textFieldItem = {

    }

    layout.push(SearchButtonItem);
    //layout.push(textFieldItem);


    return (<ReactGridLayout
            className="layout"
            layout={layout}
            cols={3}
            rowHeight = {5}
            width={1200}>
            <div key={res.searchButton.name}>{res.searchButton.value}</div>
            </ReactGridLayout>
           );
  }
}


function mapStateToProps(state) {
  return { res: state.res };
}

export default connect(mapStateToProps)(MyGrid);
export default connect(mapStateToProps)(BaseGrid);
