import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import StartQuizForm from './StartQuizForm';
import StartExamQuizForm from './StartExamQuizForm';

import { getAllQuizStats } from '../actions/stats';
import {
  startQuizRequest,
  setChosenAssignmentTypes,
} from '../actions/assignment';

// eslint-disable-next-line
class StartQuiz extends Component {
  componentDidMount() {
    this.props.getAllQuizStats();
  }

  render() {
    const { skillLevels, streakTrackers, assignmentTypes, achievements, onStartQuiz } = this.props;
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
      <div className="container">
        <div className="row">
          <div className="col s6">
            <StartQuizForm basicAssignments={basicAssignments} onSubmit={onStartQuiz} />
            <hr />
            {examAssignments.length > 0 && <StartExamQuizForm examAssignments={examAssignments} onSubmit={onStartQuiz} />}
          </div>
          <div className="col s6">
            <h3>Statistics</h3>
            <h4>Achievements</h4>
            {achievements.length > 0
            ? <ul>
              {achievements.map(achievement =>
                <li key={achievement.identifier_string}>{achievement.title}</li>
              )}
            </ul>
            : <p>No achievements yet!</p>
            }
            <h4>Skill Level</h4>
            <ul>
              {skillLevels.map((skill, i) =>
                <li key={`skill-${i}`}>{`${skill.assignment_type}:`} <b>{skill.skill_level}</b></li>
              )}
            </ul>
            <h4>Streaks</h4>
            <ul>
              {streakTrackers.map((streak, i) =>
                <li key={`streak-${i}`}>{`Current streak in ${streak.assignment_type}:`} <b>{streak.current_streak}</b></li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

StartQuiz.propTypes = {
  skillLevels: PropTypes.array.isRequired,
  streakTrackers: PropTypes.array.isRequired,
  assignmentTypes: PropTypes.array.isRequired,
  achievements: PropTypes.array,
  onStartQuiz: PropTypes.func.isRequired,
  getAllQuizStats: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    getAllQuizStats: () => {
      dispatch(getAllQuizStats());
    },
    onStartQuiz: formData => {
      dispatch(startQuizRequest(formData));
      dispatch(setChosenAssignmentTypes(formData.assignment_types));
    },
  };
};

const mapStateToProps = state => {
  const { skills, streaks } = state.stats;
  const { types } = state.assignment;
  const { meta: achievements } = state.achievements.achievements;
  return {
    achievements,
    skillLevels: skills.data,
    streakTrackers: streaks.data,
    assignmentTypes: types.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartQuiz);
