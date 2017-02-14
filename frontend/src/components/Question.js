import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import ContentSend from 'material-ui/svg-icons/content/send';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';

import ReportModal from '../components/ReportModal';
import AchievementsModal from '../components/AchievementsModal';

import { InputEditor, OutputEditor, setEditorFocus } from './editor';

import { selectors as assignmentSelectors, actions } from '../data/assignment';
import { actions as modalActions } from '../data/modals';
import { selectors as statsSelectors } from '../data/stats';

const styles = {
  sidebarButtonWrapper: {
    width: 0,
  },
  sidebarButton: {
    marginLeft: -60,
    marginTop: 20,
  },
  runButton: {
    marginRight: 10,
  },
  assignmentText: {
    fontSize: 14,
  },
  assignmentCard: {
    marginTop: 20,
    marginBottom: 20,
  },
  hintCard: {
    marginBottom: 20,
  },
  infoCard: {
    marginBottom: 20,
  },
};

class Question extends Component {
  state = {
    sidebarVisible: true,
  }

  activateSidebar = () => {
    setEditorFocus();
    this.setState({
      sidebarVisible: !this.state.sidebarVisible,
    });
  }

  handleCompileCode = () => {
    this.props.onCompileClick({ code: this.props.editorValue });
    setEditorFocus();
  }

  handleSubmitClick = () => {
    const { assignment, hasCorrectSolution, assignmentTypes } = this.props;
    const payload = {
      assignment_pk: assignment.id,
      correct_answer: hasCorrectSolution,
      assignment_types: assignmentTypes,
    };
    this.props.onSubmitClick(payload);
    setEditorFocus();
  }

  render() {
    const { editorValue, isLoadingAssignment, compilation, assignment, hasCorrectSolution, openReportModal } = this.props;

    return (
      <div id="assignment-container">
        <div id="assignment-editor-container" className={!this.state.sidebarVisible ? 'full-screen' : ''}>
          <div id="editor-row">
            <div id="assignment-editor">
              <InputEditor
                code={isLoadingAssignment ? 'Loading assignment...' : editorValue}
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
              <RaisedButton
                label="Report an issue with this task"
                labelColor="#ffffff"
                backgroundColor="#ffa726"
                onTouchTap={openReportModal}
              />
            </div>
            <div className="assignment-action-bar-controls">
              <RaisedButton
                label={!compilation.isFetching ? 'Run Code' : 'Executing'}
                labelColor="#ffffff"
                labelPosition="before"
                backgroundColor="#4caf50"
                icon={<PlayArrow />}
                style={styles.runButton}
                onTouchTap={this.handleCompileCode}
              />
              <RaisedButton
                label="Skip"
                labelColor="#ffffff"
                labelPosition="before"
                backgroundColor="#ef5350"
                icon={<ContentSend />}
                disabled={hasCorrectSolution}
                onTouchTap={this.handleSubmitClick}
              />
            </div>
          </div>
        </div>
        <div style={styles.sidebarButtonWrapper}>
          <FloatingActionButton
            mini
            style={styles.sidebarButton}
            backgroundColor="#757575"
            onTouchTap={this.activateSidebar}
          >
            {this.state.sidebarVisible ?
              <ChevronRight />
              :
              <ChevronLeft />
            }
          </FloatingActionButton>
        </div>
        <div id="assignment-sidebar" className={!this.state.sidebarVisible ? 'is-hidden' : ''}>
          <Card style={styles.assignmentCard} id="assignment-card">
            <CardTitle title="Assignment" subtitle={`ID: ${assignment.id}`} />
            <CardText>
              <p style={styles.assignmentText} dangerouslySetInnerHTML={{ __html: assignment.assignment_text }} />
            </CardText>
          </Card>
          {(assignment.hint_text || assignment.resource_url) &&
            <Card style={styles.hintCard} id="hint-card">
              <CardTitle title="Hint and resources" subtitle="Useful tips!" />
              {assignment.hint_text &&
                <CardText>
                  <p className="description-text" dangerouslySetInnerHTML={{ __html: assignment.hint_text }} />
                </CardText>
              }
              {assignment.resource_url &&
                <CardActions>
                  <FlatButton label="Additional Resource (opens in a new tab)" href={assignment.resource_url} target="_blank" primary />
                </CardActions>
              }
            </Card>
          }
          <Card style={styles.infoCard}>
            <CardHeader
              title="Info"
              subtitle="Tips and tricks"
              actAsExpander
              showExpandableButton
            />
            <CardText expandable>
              <p>Pressing "Skip" will forward you to the next task and a failed attempt is registered in the system.</p>
              <p>You may use the shortcut <span className="code-block">{navigator.platform === 'MacIntel' ? 'cmd + enter' : 'ctrl + enter'}</span> in order to quickly compile your code.</p>
            </CardText>
          </Card>
        </div>
        <ReportModal assignmentId={this.props.assignment.id} />
        <AchievementsModal />
      </div>
    );
  }
}

Question.propTypes = {
  assignment: PropTypes.object.isRequired,
  assignmentTypes: PropTypes.array,
  isLoadingAssignment: PropTypes.bool.isRequired,
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
    openReportModal: () => {
      dispatch(modalActions.toggleReportModal());
    },
  };
};

const mapStateToProps = state => {
  const {
    types: { chosenTypes: assignmentTypes },
    task: { meta, isFetching: isLoadingAssignment },
    editor: { value: editorValue },
    compilation,
  } = state.assignment;

  return {
    assignment: meta,
    hasCorrectSolution: assignmentSelectors.isCorrectSolution(state),
    assignmentTypeStreaks: statsSelectors.getAssignmentTypeStreaks(state),
    isLoadingAssignment,
    assignmentTypes,
    compilation,
    editorValue,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
