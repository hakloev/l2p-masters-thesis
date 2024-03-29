import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class ExperimentSelector extends Component {

  render() {
    const { onTestStart } = this.props;

    return (
      <div>
        <div>
          <p className="info-text">This is an experiment testing the capabilities of online web solutions as a learning platform as opposed to traditional learning methods. Thus, this experiment is done to evaluate the capabilities of said systems. The experiment will in no way focus on your capabilites, as the focus of this experiment is solely to measure the learning outcome using different methods.</p>
          <p className="info-text">When pressing the <span className="bold">Start</span> button below, you will see a code editor on the left side of the screen, in which you will write Python-code. To run the code, press the <span className="bold">Run Code</span> button on the bottom. If your solution is correct, a <span className="bold">Next Task</span> button will appear, allowing you to procede to the next task. The assignment, as well as any hints or additional sources of information are located on the right side of the screen. The <span className="bold">Skip</span> button can be used to skip the current task. Keep in mind however, that the tasks do become increasingly harder.</p>
        </div>
        <RaisedButton
          type="submit"
          label="Start"
          labelColor="#ffffff"
          backgroundColor="#ffa726"
          onTouchTap={() => onTestStart({ assignment_types: ['experiment'] })}
        />
      </div>
    );
  }
}

ExperimentSelector.propTypes = {
  onTestStart: PropTypes.func.isRequired,
};

export default ExperimentSelector;
