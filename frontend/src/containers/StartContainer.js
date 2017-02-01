import React from 'react';
import { connect } from 'react-redux';
import { SHOULD_DISPLAY_TEST } from '../common/constants';
import TestSelector from '../components/TestSelector';
import QuizSelector from '../components/QuizSelector';
import Banner from '../components/Banner';

import { actions as statsActions } from '../data/stats';
import { actions as assignmentActions } from '../data/assignment';

class StartContainer extends React.Component {

  componentDidMount() {
    if (SHOULD_DISPLAY_TEST) {
      this.props.getAllQuizStats();
    } else {
      this.props.getAssignmentTypes();
    }
  }

  render() {
    return <div>
      <Banner title={SHOULD_DISPLAY_TEST ? 'start' : 'select a quiz'} />
      <div className="container start-quiz-container">
        { SHOULD_DISPLAY_TEST ?
          <TestSelector
            onTestStart={this.props.onStartQuiz}
          />
          :
          <QuizSelector
            assignmentTypes={this.props.assignmentTypes}
            hasExamQuestions={this.props.hasExamQuestions}
            userStreak={this.props.userStreak}
            onQuizSelect={this.props.onStartQuiz}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartContainer);
