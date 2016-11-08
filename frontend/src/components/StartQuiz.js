import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import StartQuizForm from './StartQuizForm';
import StartExamQuizForm from './StartExamQuizForm';
import Banner from './Banner';

import { actions as statsActions } from '../data/stats';
import { actions as assignmentActions } from '../data/assignment';


// eslint-disable-next-line
class StartQuiz extends Component {
  componentDidMount() {
    this.props.getAllQuizStats();
  }

  render() {
    const { streakTrackers, assignmentTypes, achievements, onStartQuiz } = this.props;
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
            <div className="col s6">
              <div className="card">
                <div className="card-content">
                  <span className="card-title">Achievements</span>
                  <p>
                    {achievements.length > 0
                      ? <ul>
                        {achievements.map(achievement =>
                          <li key={achievement.identifier_string}>
                            {achievement.title}
                          </li>
                        )}
                      </ul>
                      : <p>No achievements yet!</p>
                    }
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="card-content">
                  <span className="card-title">Streaks</span>
                  <ul>
                    {streakTrackers.map((streak, i) =>
                      <li key={`streak-${i}`}>{`Current streak in ${streak.assignment_type}:`} <b>{streak.current_streak}</b></li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StartQuiz.propTypes = {
  streakTrackers: PropTypes.array.isRequired,
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
  const { streaks } = state.stats;
  const { types } = state.assignment;
  const { meta: achievements } = state.achievements.achievements;
  return {
    achievements,
    streakTrackers: streaks.data,
    assignmentTypes: types.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartQuiz);
