import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactGridLayout from 'react-grid-layout';
import DarkButton from './button';
import DarkHintTextField from './textfield';


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class MyGrid extends Component{


  render() {
    // layout is an array of objects, see the demo for more complete usage
    const results = [
      { k: '12345', v: 'abcde' },
      { k: '23451', v: 'eabcd' },
      { k: '34512', v: 'cdeab' },
      { k: '12453', v: 'abde3' },
      { k: '34521', v: 'cdeba' },
    ];

    //var aa = <DarkButton name="hi"/>;
    let layout = [];
    let index = 0;
    { for (let r in results) {
      let item = { i: results[r].k,
                   x: index,
                   y: 0,
                   w: getRandomInt(1, 10),
                   h: getRandomInt(2, 5) };
      layout.push(item);
      index++;
    } }

    return (<ReactGridLayout
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={30}
            width={1200}>

            {results.map(
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
    <MyGrid />,
  document.getElementById('demo3')
);
