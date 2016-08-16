import ReactGridLayout from 'react-grid-layout';
import React, { Component, PropTypes } from 'react';




class MyGrid extends Component{

  render() {
    const { res } = this.props;
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

export default connect(ButtonState, ButtonDispatch)(DarkButton);
