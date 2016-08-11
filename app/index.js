import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactGridLayout from 'react-grid-layout';
import DarkButton from './button';
import DarkHintTextField from './textfield';
import { connect } from 'react-redux';


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const results = [
  { k: '12345', v: 'abcde' },
  { k: '23451', v: 'eabcd' },
  { k: '34512', v: 'cdeab' },
  { k: '12453', v: 'abde3' },
  { k: '34521', v: 'cdeba' },
];

class MyGrid extends Component{


  render() {
    const { res } = this.props;
    // layout is an array of objects, see the demo for more complete usage

    //var aa = <DarkButton name="hi"/>;
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



ReactDOM.render(
  <DarkHintTextField name="input your secrets" />,
  document.getElementById('demo1')
);


ReactDOM.render(
    <DarkButton name="search" />,
  document.getElementById('demo2')
);


ReactDOM.render(
    <MyGrid results={results}/>,
  document.getElementById('demo3')
);
