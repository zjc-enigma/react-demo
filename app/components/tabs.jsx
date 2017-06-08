import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SelectList1 from './SelectList1';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export default class TabsControlled extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="近义词" value="a" >
          <div style={styles.headline}>
             <SelectList1
               itemArray={this.props.similarItemArray}
               handleClick={this.props.handleClick1} />
         </div>
          {/*<div>
            <h2 style={styles.headline}>Controllable Tab A</h2>
            <p>
              Tabs are also controllable if you want to programmatically pass them their values.
              This allows for more functionality in Tabs such as not
              having any Tab selected or assigning them different values.
            </p>
          </div>*/}
        </Tab>
        <Tab label="行业词" value="b">
          <div style={styles.headline}>
             <SelectList1
               itemArray={this.props.industryItemArray}
               handleClick={this.props.handleClick1} />
         </div>
        </Tab>
        <Tab label="高频词" value="c">
          <div style={styles.headline}>
             <SelectList1
               itemArray={this.props.importantItemArray}
               handleClick={this.props.handleClick1} />
         </div>
        </Tab>
      </Tabs>
    );
  }
}