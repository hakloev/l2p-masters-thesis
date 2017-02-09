import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

import { SHOULD_DISPLAY_EXPERIMENT } from '../common/constants';
import ExperimentSelector from '../components/ExperimentSelector';
import QuizSelector from '../components/QuizSelector';
import Banner from '../components/Banner';

import { actions as statsActions } from '../data/stats';
import { actions as assignmentActions } from '../data/assignment';

const styles = {
  container: {
    width: '80%',
    margin: '30px auto',
  },
};

class StartContainer extends React.Component {

  componentDidMount() {
    if (SHOULD_DISPLAY_EXPERIMENT) {
      this.props.getAllQuizStats();
    } else {
      this.props.getAssignmentTypes();
    }
  }

  render() {
    return <div>
      <Banner title={SHOULD_DISPLAY_EXPERIMENT ? 'start the experiment' : 'select a quiz'} />
      <div style={styles.container}>
        {SHOULD_DISPLAY_EXPERIMENT ?
          <ExperimentSelector
            onTestStart={this.props.onStartQuiz}
          />
          :
          <QuizSelector
            assignmentTypes={this.props.assignmentTypes}
            hasExamQuestions={this.props.hasExamQuestions}
            userStreak={this.props.userStreak}
            onQuizSelect={this.props.onStartQuiz}
            formSubmit={this.props.handleFormSubmit}
          />
        }
      </div>
    </div>;
  }
}

const mapStateToProps = state => {
  const { data: streaks } = state.stats;
  const { userStreak } = streaks;
  const { types } = state.assignment;
  const { meta: achievements } = state.achievements.achievements;

  return {
    achievements,
    userStreak,
    assignmentTypes: types.data,
    hasExamQuestions: types.hasExamQuestions,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAssignmentTypes: () => {
      dispatch(assignmentActions.getAssignmentTypesRequest());
    },
    getAllQuizStats: () => {
      dispatch(statsActions.getAllQuizStats());
    },
    onStartQuiz: formData => {
      dispatch(assignmentActions.startQuizRequest(formData));
      dispatch(assignmentActions.setChosenAssignmentTypes(formData.assignment_types));
    },
    handleFormSubmit: identifier => dispatch(submit(identifier)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartContainer);
