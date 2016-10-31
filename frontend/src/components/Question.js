import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { InputEditor, OutputEditor } from './editor';
import { isCorrectSolution } from '../selectors/compilation';
import * as actions from '../actions/compilation';

const Question = ({ assignment, assignmentTypes, compilationResult, hasCorrectSolution, editorValue, onCompileClick, onSubmitClick, onEditorChange }) => {

  const handleCompileCode = () => {
    onCompileClick({ code: editorValue });
  };

  const handleSubmitClick = () => {
    const payload = {
      assignment_pk: assignment.id,
      correct_answer: hasCorrectSolution,
      assignment_types: assignmentTypes,
    };
    onSubmitClick(payload);
  };

  return (
    <div id="assignment-container">
      <div id="assignment-editor-container" className="">
        <div className="" id="editor-row">
          <div id="assignment-editor">
            <InputEditor code={editorValue} onChange={onEditorChange} />
          </div>
          <div id="assignment-output">
            <OutputEditor code={compilationResult.result.output} isFetching={compilationResult.isFetching} />
          </div>
        </div>
        <div id="assignment-action-bar">
          <button onClick={handleCompileCode} className="btn btn-compile btn-large waves-effect waves-light">
            <i className="material-icons right">play_arrow</i>
            {!compilationResult.isFetching ? 'Run Code' : 'Executing'}
          </button>
          <button onClick={handleSubmitClick} className={'btn btn-submit btn-large waves-effect waves-light'}>
            <i className="material-icons right">send</i>
            Submit
          </button>
        </div>
      </div>
      <div id="assignment-sidebar" className="">
        <div className="card task-card">
          <div className="card-content">
            <span className="card-title">Assigment:</span>
            <p className="description-text" dangerouslySetInnerHTML={{ __html: assignment.assignment_text }} />
          </div>
        </div>
        {assignment.hint_text &&
          <div className="card hint-card">
            <div className="card-content">
              <span className="card-title">Hint</span>
              <p className="description-text" dangerouslySetInnerHTML={{ __html: assignment.hint_text }} />
            </div>
            <div className="card-action">
              <a href={assignment.resource_url} target="_blank" rel="noopener noreferrer">Additional Resource</a>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

Question.propTypes = {
  assignment: PropTypes.object.isRequired,
  assignmentTypes: PropTypes.array,
  compilationResult: PropTypes.object.isRequired,
  hasCorrectSolution: PropTypes.bool,
  editorValue: PropTypes.string.isRequired,
  onCompileClick: PropTypes.func.isRequired,
  onSubmitClick: PropTypes.func.isRequired,
  onEditorChange: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    onCompileClick: code => {
      dispatch(actions.compileCodeRequest(code));
    },
    onSubmitClick: payload => {
      dispatch(actions.submitAnswerRequest(payload));
    },
    onEditorChange: newValue => {
      dispatch(actions.editorCodeChanged(newValue));
    },
  };
};

const mapStateToProps = state => {
  const { types: { chosenTypes: assignmentTypes }, task: { meta } } = state.assignment;
  const { editor: { value: editorValue }, result: compilationResult } = state.compilation;
  return {
    assignment: meta,
    hasCorrectSolution: isCorrectSolution(state),
    assignmentTypes,
    compilationResult,
    editorValue,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
