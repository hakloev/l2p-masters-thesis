import React, { Component, PropTypes } from 'react';

class ExperimentSelector extends Component {

  render() {
    const { onTestStart } = this.props;

    return (
      <div className="row">
        <div className="col s12 center">
          <p>Click the button below in order to start:</p>
          <button
            type="submit"
            onClick={() => onTestStart({ assignment_types: ['experiment'] })}
            className="btn waves-effect waves-light btn-large deep-orange"
          >
            <i className="material-icons right">send</i>
            Start
          </button>
        </div>
      </div>
    );
  }
}

ExperimentSelector.propTypes = {
  onTestStart: PropTypes.func.isRequired,
};

export default ExperimentSelector;
