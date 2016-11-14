import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import StartQuizForm from './StartQuizForm';
import StartExamQuizForm from './StartExamQuizForm';
import Banner from './Banner';
import StatisticsBadge from './StatisticsBadge';

import { actions as statsActions } from '../data/stats';
import { actions as assignmentActions } from '../data/assignment';

// eslint-disable-next-line
class StartQuiz extends Component {
  componentDidMount() {
    this.props.getAllQuizStats();
  }

  render() {
    const { userStreak, assignmentTypes, hasExamQuestions, onStartQuiz } = this.props;

    return (
      <div>
        <Banner title="start your quiz!" />
        <div className="container start-quiz-container">
          <div className="row">
            <div className="col s6">
              <StartQuizForm assignmentTypes={assignmentTypes} onSubmit={onStartQuiz} />
            </div>
            <div className="col s6 stats-column">
              {hasExamQuestions &&
                <StartExamQuizForm onSubmit={onStartQuiz} />
              }
            </div>
          </div>
          <div className="row">
            <div className="col s6">
              <StatisticsBadge title="Current Streak" subtitle="on all assignments" count={userStreak.streak} />
              <StatisticsBadge title="Maximum Streak" subtitle="on all assignments" count={userStreak.maximum_streak} />
            </div>
            <div className="col s6" />
          </div>
        </div>
      </div>
    );
  }
}

StartQuiz.propTypes = {
  assignmentTypes: PropTypes.array.isRequired,
  hasExamQuestions: PropTypes.bool.isRequired,
  userStreak: PropTypes.object.isRequired,
  onStartQuiz: PropTypes.func.isRequired,
  getAllQuizStats: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    getAllQuizStats: () => {
      dispatch(statsActions.getAllQuizStats());
    },
    onStartQuiz: formData => {
      dispatch(assignmentActions.startQuizRequest(formData));
      dispatch(assignmentActions.setChosenAssignmentTypes(formData.assignment_types));
    },
  };
};

const mapStateToProps = state => {
  const { assignmentTypeStreak, userStreak } = state.stats;
  const { types } = state.assignment;
  const { meta: achievements } = state.achievements.achievements;
  return {
    achievements,
    userStreak: userStreak.data,
    assignmentTypeStreak: assignmentTypeStreak.data,
    assignmentTypes: types.data,
    hasExamQuestions: types.hasExamQuestions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartQuiz);
