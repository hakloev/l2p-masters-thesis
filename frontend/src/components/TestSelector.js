import React, { Component, PropTypes } from 'react';

class TestSelector extends Component {

  render() {
    const { onTestStart } = this.props;

    return (
      <div className="row">
        <div className="col s12">
          <p>Click the button bellow in order to start the test:</p>
          <button
            type="submit"
            onClick={() => onTestStart({ assignment_types: ['exam'] })}
            className="btn waves-effect waves-light btn-large deep-orange"
          >
            <i className="material-icons right">send</i>
            Start Test
          </button>
        </div>
      </div>
    );
  }
}

TestSelector.propTypes = {
  onTestStart: PropTypes.func.isRequired,
};

export default TestSelector;
