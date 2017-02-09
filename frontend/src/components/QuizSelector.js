import React, { Component, PropTypes } from 'react';

import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';

import StartQuizForm from './StartQuizForm';
import StatisticsBadge from './StatisticsBadge';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '30px auto',
  },
  generalCard: {
    width: '35%',
    height: '100%',
    marginRight: 10,
  },
  examCard: {
    width: '35%',
    height: '100%',
    marginRight: 10,
  },
  statisticsCard: {
    width: '30%',
    height: '100%',
  },
};

class QuizSelector extends Component {


  onStartPracticeQuiz = () => {
    this.props.formSubmit('start-quiz');
  }

  onStartExamQuiz = () => {
    this.props.onQuizSelect({ assignment_types: ['exam'] });
  };

  handleStartPracticeQuiz = fields => {
    const types = [];
    const prefix = 'assignment_';
    Object.keys(fields).forEach(key => {
      if (fields[key] && key.indexOf(prefix) === 0) {
        types.push(key.substring(prefix.length));
      }
    });

    const formFields = { assignment_types: types };

    this.props.onQuizSelect(formFields);
  };

  render() {
    const { userStreak, assignmentTypes, hasExamQuestions } = this.props;

    return (
      <div style={styles.container}>
        <Card style={styles.generalCard}>
          <CardTitle title="General Quiz" subtitle="Learn basic programming!" />
          <CardText>
            <p>These tasks are meant for practicing certain core aspects of programming. Select the topics you want to practice:</p>
            <StartQuizForm
              form="start-quiz"
              assignmentTypes={assignmentTypes}
              onSubmit={this.handleStartPracticeQuiz}
            />
          </CardText>
          <CardActions>
            <FlatButton
              label="Start"
              type="submit"
              onTouchTap={this.onStartPracticeQuiz}
            />
          </CardActions>
        </Card>
        <Card style={styles.examCard}>
          <CardTitle title="Exam Questions" subtitle="Practice for your exam!" />
          <CardText>
            {hasExamQuestions &&
              <p>These tasks are of varying difficulty and are meant as practice prior to the exam.</p>
            }
          </CardText>
          <CardActions>
            <FlatButton
              label="Start"
              onTouchTap={this.onStartExamQuiz}
            />
          </CardActions>
        </Card>
        <Card style={styles.statisticsCard}>
          <CardTitle title="Statistics" subtitle="Your all-over streaks" />
          <CardText>
            <StatisticsBadge title="Current Streak" subtitle="on all assignments" count={userStreak.streak} />
            <StatisticsBadge title="Highest Streak" subtitle="on all assignments" count={userStreak.maximum_streak} />
          </CardText>
        </Card>
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
