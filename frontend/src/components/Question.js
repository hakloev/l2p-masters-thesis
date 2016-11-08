import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { InputEditor, OutputEditor } from './editor';
import StatisticsBadge from './StatisticsBadge';
import { open as openModal } from './ReportModal';
import { selectors as assignmentSelectors, actions } from '../data/assignment';
import { selectors as statsSelectors } from '../data/stats';


class Question extends Component {

  constructor(props) {
    super(props);
    this.handleCompileCode = this.handleCompileCode.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  componentDidMount() {
    $('.tooltipped').tooltip();
  }

  componentWillUnmount() {
    $('.tooltipped').tooltip('remove');
  }

  handleCompileCode() {
    this.props.onCompileClick({ code: this.props.editorValue });
  }

  handleSubmitClick() {
    const { assignment, hasCorrectSolution, assignmentTypes } = this.props;
    const payload = {
      assignment_pk: assignment.id,
      correct_answer: hasCorrectSolution,
      assignment_types: assignmentTypes,
    };
    this.props.onSubmitClick(payload);
  }

  render() {
    const { editorValue, compilation, assignment, assignmentTypeStreaks, hasCorrectSolution } = this.props;
    return (
      <div id="assignment-container">
        <div id="assignment-editor-container" className="">
          <div className="" id="editor-row">
            <div id="assignment-editor">
              <InputEditor
                code={editorValue}
                onChange={this.props.onEditorChange}
                compileCode={this.handleCompileCode}
              />
            </div>
            <div id="assignment-output">
              <OutputEditor
                code={compilation.result.output}
                isFetching={compilation.isFetching}
                hasCorrectSolution={hasCorrectSolution}
                onNextQuestionClick={this.handleSubmitClick}
              />
            </div>
          </div>
          <div id="assignment-action-bar">
            <div className="assignment-action-bar-report">
              <button
                onClick={openModal}
                id=""
                className="waves-effect waves-light btn btn-large btn-report orange lighten-1"
              >
                Report an issue with this task
              </button>
            </div>
            <div className="assignment-action-bar-controls">
              <button
                onClick={this.handleCompileCode}
                className="btn tooltipped btn-large waves-effect waves-light green"
                data-position="top"
                data-delay="50"
                data-tooltip={navigator.platform === 'MacIntel' ? 'cmd + enter' : 'ctrl + enter'}
              >
                <i className="material-icons right">play_arrow</i>
                {!compilation.isFetching ? 'Run Code' : 'Executing'}
              </button>
              <button
                onClick={this.handleSubmitClick}
                id="skip-button"
                className={'btn tooltipped btn-large waves-effect waves-light red lighten-1'}
                data-position="top"
                data-delay="50"
                data-tooltip="This will be registered as a failed attempt"
                disabled={hasCorrectSolution}
              >
                <i className="material-icons right">send</i>
                Skip
              </button>
            </div>
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
          <div className="row">
            <div className="col s6">
              <StatisticsBadge title="Current Streak" subtitle={`in ${assignmentTypeStreaks.assignment_type.toLowerCase()}`} count={assignmentTypeStreaks.current_streak} />
            </div>
            <div className="col s6">
              <StatisticsBadge title="Maximum Streak" subtitle={`in ${assignmentTypeStreaks.assignment_type.toLowerCase()}`} count={assignmentTypeStreaks.maximum_streak} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  assignment: PropTypes.object.isRequired,
  assignmentTypes: PropTypes.array,
  assignmentTypeStreaks: PropTypes.object,
  compilation: PropTypes.object.isRequired,
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
  const {
    types: { chosenTypes: assignmentTypes },
    task: { meta },
    editor: { value: editorValue },
    compilation,
  } = state.assignment;

  return {
    assignment: meta,
    hasCorrectSolution: assignmentSelectors.isCorrectSolution(state),
    assignmentTypeStreaks: statsSelectors.getAssignmentTypeStreaks(state),
    assignmentTypes,
    compilation,
    editorValue,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
