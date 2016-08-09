import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactGridLayout from 'react-grid-layout'
import DarkButton from './button'
import DarkHintTextField from './textfield'



class MyGrid extends Component{

  
  render(){
    // layout is an array of objects, see the demo for more complete usage
    var aa = <DarkButton name="hi"/>
      var layout = [
        {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
        {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
        {i: 'c', x: 4, y: 0, w: 1, h: 2}
      ];
      return (
          <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
          <div key={'a'}>{aa}</div>
          <div key={'b'}>{aa}</div>
          <div key={'c'}>{aa}</div>
          </ReactGridLayout>
      );
  }
}



ReactDOM.render(
  <DarkHintTextField name="input your secrets" />,
  document.getElementById('demo1')
);


ReactDOM.render(
    <DarkButton name="search" />,
  document.getElementById('demo2')
);


ReactDOM.render(
    <MyGrid />,
  document.getElementById('demo3')
)
