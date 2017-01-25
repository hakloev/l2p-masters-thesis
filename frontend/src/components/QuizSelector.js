import React, { Component, PropTypes } from 'react';

import StartQuizForm from './StartQuizForm';
import StartExamQuizForm from './StartExamQuizForm';
import StatisticsBadge from './StatisticsBadge';

class QuizSelector extends Component {

  render() {
    const { userStreak, assignmentTypes, hasExamQuestions, onQuizSelect } = this.props;

    return (
      <div className="row">
        <div className="col s4">
          <StartQuizForm assignmentTypes={assignmentTypes} onSubmit={onQuizSelect} />
        </div>
        <div className="col s4">
          {hasExamQuestions &&
            <StartExamQuizForm onSubmit={onQuizSelect} />
          }
        </div>
        <div className="col s4">
          <h4>Statistics</h4>
          <StatisticsBadge title="Current Streak" subtitle="on all assignments" count={userStreak.streak} />
          <StatisticsBadge title="Highest Streak" subtitle="on all assignments" count={userStreak.maximum_streak} />
        </div>
      </div>
    );
  }
}

QuizSelector.propTypes = {
  assignmentTypes: PropTypes.array.isRequired,
  hasExamQuestions: PropTypes.bool.isRequired,
  userStreak: PropTypes.object.isRequired,
  onQuizSelect: PropTypes.func.isRequired,
};

export default QuizSelector;
