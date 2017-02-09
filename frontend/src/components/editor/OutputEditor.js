import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';


const CompilationIndicator = () => {
  return (
    <div className="output-overlay">
      <CircularProgress
        size={128}
        thickness={5}
        color="#ffa726"
      />
    </div>
  );
};

const NextTaskIndicator = ({ shouldDisplay, onNextClick }) => {
  return (
    <div className="output-overlay task">
      <div id="submit-button" className={`${shouldDisplay ? 'is-visible' : 'is-hidden'}`}>
        <RaisedButton
          label="Next Task"
          labelColor="#ffffff"
          icon={<CheckCircle />}
          onTouchTap={onNextClick}
          backgroundColor="#26a69a"
        />
      </div>
    </div>
  );
};

const OutputEditor = ({ code, isFetching, hasCorrectSolution, onNextQuestionClick }) => {
  return (
    <div id="output-wrapper">
      {isFetching &&
        <CompilationIndicator />
      }
      <NextTaskIndicator shouldDisplay={hasCorrectSolution} onNextClick={onNextQuestionClick} />
      <textarea
        id="output-console"
        disabled
        value={!isFetching ? code : ''}
      />
    </div>
  );
};

OutputEditor.propTypes = {
  code: PropTypes.string,
  isFetching: PropTypes.bool,
  hasCorrectSolution: PropTypes.bool,
  onNextQuestionClick: PropTypes.func.isRequired,
};

export default OutputEditor;
