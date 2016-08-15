import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import ReactGridLayout from 'react-grid-layout';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import React, { Component } from 'react';







let store = createStore(reducer);


class DarkButton extends Component {

  render() {
    return (
        <RaisedButton
      label="search"
      onClick={this.props.show()} />)
  }
}




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




ReactDOM.render(
    <Provider store={store}>
    <DarkButton />
    </Provider>,
  document.getElementById('demo2')
);


ReactDOM.render(
    <Provider store={store}>
    <MyGrid />
    </Provider>,
  document.getElementById('demo3')
);
