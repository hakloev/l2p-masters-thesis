import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { InputEditor, OutputEditor } from './editor';
import * as actions from '../actions/quiz';

const Question = ({ assignment, assignmentTypes, compilation, answer, editorValue, onCompileClick, onSubmitClick, onEditorChange }) => {

  const handleCompileCode = () => {
    onCompileClick({ code: editorValue });
  };

  const handleSubmitClick = () => {
    const payload = {
      assignment_pk: assignment.id,
      correct_answer: answer,
      assignment_types: assignmentTypes,
    };
    onSubmitClick(payload);
  };

  return (
    <div className="row">
      <div className="col s12" id="assignment-header-container">
        <h1>{assignment.title}</h1>
        <div className="chip">Difficulty level: {assignment.difficulty_level}</div>
        <h5>Task:</h5>
        <p dangerouslySetInnerHTML={{ __html: assignment.assignment_text }} />
      </div>
      <div className="col s12" id="assignment-editor-container">
        <div className="row">
          <div className="col s6">
            <InputEditor code={editorValue} onChange={onEditorChange} />
          </div>
          <div className="col s6">
            <OutputEditor code={compilation.output} />
          </div>
        </div>
      </div>
      <div className="col s12" id="assignment-help-container">
        <div className="row">
          <div className="col s6">
            {assignment.hint_text &&
              <div>
                <h5>Hint:</h5>
                <p dangerouslySetInnerHTML={{ __html: assignment.hint_text }} />
              </div>
            }
            <div>
              <h5 className="lp-question__header">Additional resources:</h5>
              <p>You can read more about {assignment.assignment_type} here:</p>
              <a href={assignment.resource_url}>{assignment.resource_url}</a>
            </div>
          </div>
          <div className="col s6" id="assignment-controls-container">
            <button onClick={handleCompileCode} className="btn waves-effect waves-light blue darken-4">
              {!compilation.isFetching ? 'Run Code' : 'Executing'}
            </button>
            <button onClick={handleSubmitClick} className={`btn waves-effect waves-light ${answer ? 'green lighten-1' : 'red darken-4'}`}>
              Submit
            </button>
            {compilation.isFetching &&
              <div className="progress">
                <div className="indeterminate" />
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

Question.propTypes = {
  assignment: PropTypes.object.isRequired,
  assignmentTypes: PropTypes.array,
  compilation: PropTypes.object.isRequired,
  editorValue: PropTypes.string.isRequired,
  answer: PropTypes.bool.isRequired,
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
  const { types: { chosenTypes: assignmentTypes }, task: { answer, compilation, meta } } = state.assignment;
  const { editorValue } = state.editor;
  return {
    assignment: meta,
    assignmentTypes,
    compilation,
    answer,
    editorValue,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
