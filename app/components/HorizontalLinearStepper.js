import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import { connect } from 'react-redux'
import React, { Component } from 'react'

let select = state => {return state};
const mapDispatchToProps = dispatch => {

}

@connect(select, mapDispatchToProps)
class HorizontalLinearStepper extends Component {

  constructor(props, context){
    super(props, context);
  }
  handleNext (stepIndex) {
    var rrr = ['bcasdafaf', 'sidfjaspifajsdf', '2312431'];
    this.props.steperNext(stepIndex, this.props.resTableSelection, rrr);
  };

  handlePrev (stepIndex)  {
    this.props.steperPrev(stepIndex);
  };

  getStepContent(stepIndex) {
    //        <p>{this.getStepContent(stepIndex)}</p>
  }

  render() {

    var finished = this.props.finished;
    var stepIndex = this.props.stepIndex;

    const contentStyle = {margin: '0 16px'};

    return (
        <MuiThemeProvider>
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>搜索文案</StepLabel>
          </Step>
          <Step>
            <StepLabel>替换关键词</StepLabel>
          </Step>
          <Step>
            <StepLabel>生成文案</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
        </div>
        </div>
        </MuiThemeProvider>
    );
  }
}

export default HorizontalLinearStepper
