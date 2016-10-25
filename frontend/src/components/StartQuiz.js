import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/quiz';
import StartQuizForm from './StartQuizForm';
import StartExamQuizForm from './StartExamQuizForm';


// eslint-disable-next-line
class StartQuiz extends Component {
  componentDidMount() {
    this.props.getAllQuizStats();
  }

  render() {
    const { skillLevels, streakTrackers, assignmentTypes, achievements, onStartQuiz } = this.props;
    const examAssignments = assignmentTypes.slice(assignmentTypes.length - 1)[0];
    const basicAssignments = assignmentTypes.slice(0, assignmentTypes.length - 1);
    return (
      <div className="row">
        <div className="col s6">
          <StartQuizForm basicAssignments={basicAssignments} onSubmit={onStartQuiz} />
          <hr></hr>
          <StartExamQuizForm examAssignments={examAssignments} onSubmit={onStartQuiz} />
        </div>
        <div className="col s6">
          <h3>Statistics</h3>
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
          <h4>Achievements</h4>
          <ul>
            {achievements.map(achievement =>
              <li key={achievement.identifier_string}>{achievement.title}</li>
            )}
          </ul>
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
      dispatch(actions.getAllQuizStats());
    },
    onStartQuiz: formData => {
      dispatch(actions.startQuizRequest(formData));
      dispatch(actions.setChosenAssignmentTypes(formData.assignment_types));
    },
  };
};

const mapStateToProps = state => {
  const { skills, streaks } = state.stats;
  const { types } = state.assignment;
  const { token } = state.auth;
  const { meta: achievements } = state.achievements.achievements;
  return {
    token,
    achievements,
    skillLevels: skills.data,
    streakTrackers: streaks.data,
    assignmentTypes: types.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartQuiz);
