import React, { PropTypes } from 'react';

const CompilationIndicator = () => {
  return (
    <div className="output-overlay">
      <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-yellow-only">
          <div className="circle-clipper left">
            <div className="circle" />
          </div><div className="gap-patch">
            <div className="circle" />
          </div><div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>
    </div>
  );
};

const NextTaskIndicator = ({ shouldDisplay, onNextClick }) => {
  return (
    <div className="output-overlay task">
      <div id="submit-button" className={`${shouldDisplay ? 'is-visible' : 'is-hidden'}`}>
        <button onClick={onNextClick} className="btn btn-large waves-effect waves-light">
          <i className="material-icons left">check_circle</i>
          Next Task
        </button>
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
      <textarea id="output-console" disabled value={!isFetching ? code : ''} />
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
