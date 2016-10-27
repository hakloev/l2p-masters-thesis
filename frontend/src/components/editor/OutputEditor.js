import React, { PropTypes } from 'react';

const PreLoader = () => {
  return (
    <div className="loading-indicator">
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

const OutputEditor = ({ code, isFetching }) => {
  return (
    <div id="output-wrapper">
      {isFetching &&
        <PreLoader />
      }
      <textarea id="output-console" disabled value={!isFetching ? code : ''} />
    </div>
  );
};

OutputEditor.propTypes = {
  code: PropTypes.string,
  isFetching: PropTypes.bool,
};

export default OutputEditor;
