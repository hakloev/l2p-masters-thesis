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
    const { assignmentTypeStreak, userStreak, assignmentTypes, onStartQuiz } = this.props;
    const basicAssignments = [];
    const examAssignments = [];
    for (let x = 0; x < assignmentTypes.length; x += 1) {
      if (assignmentTypes[x].type_name === 'Exam practice') {
        examAssignments.push(assignmentTypes[x]);
      } else {
        basicAssignments.push(assignmentTypes[x]);
      }
    }
    return (
      <div>
        <Banner title="start your quiz!" />
        <div className="container start-quiz-container">
          <div className="row">
            <div className="col s6">
              <StartQuizForm basicAssignments={basicAssignments} onSubmit={onStartQuiz} />
              <hr />
              {examAssignments.length > 0 &&
                <StartExamQuizForm examAssignments={examAssignments} onSubmit={onStartQuiz} />
              }
            </div>
            <div className="col s6 stats-column">
              <div className="row">
                <div className="col s6">
                  <StatisticsBadge title="Current Streak" subtitle="on all assignments" count={userStreak.streak} />
                </div>
                <div className="col s6">
                  <StatisticsBadge title="Maximum Streak" subtitle="on all assignments" count={userStreak.maximum_streak} />
                </div>
              </div>
              <div className="row">
                {assignmentTypeStreak.map((streak, i) =>
                  <div className="col s6" key={`streak-${i}`}>
                    <StatisticsBadge title="Current Streak" subtitle={`in ${streak.assignment_type.toLowerCase()}`} count={streak.current_streak} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StartQuiz.propTypes = {
  assignmentTypeStreak: PropTypes.array.isRequired,
  userStreak: PropTypes.object.isRequired,
  assignmentTypes: PropTypes.array.isRequired,
  achievements: PropTypes.array,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartQuiz);
