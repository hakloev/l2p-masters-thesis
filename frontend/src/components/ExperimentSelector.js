import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class ExperimentSelector extends Component {

  render() {
    const { onTestStart } = this.props;

    return (
      <div>
        <p>Click the button below in order to start:</p>
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
