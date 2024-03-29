import ReactGA from 'react-ga';
import { actions as assignmentActions } from '../data/assignment';

const timingReporter = (category = 'Custom Timing', { variable, value, label }) => {
  ReactGA.timing({
    category,
    variable,
    value, // in milliseconds
    label,
  });
};

const reporter = (category = 'Custom Event', { type, label, value }) => {
  ReactGA.event({
    category,
    label,
    value,
    action: type,
  });
};

const dispatchAnalyticsAction = (action, state) => {
  switch (action.type) {
  case assignmentActions.COMPILE_CODE_REQUEST:
    return reporter('Compilation', {
      type: action.type,
      label: 'Requesting Compilation',
      value: state.assignment.task.meta.id,
    });
  case assignmentActions.COMPILE_CODE_SUCCESS:
    if (action.result.error) {
      return reporter('Compilation', {
        type: action.type,
        label: action.result.error,
        value: state.assignment.task.meta.id,
      });
    }
    return reporter('Compilation', {
      type: action.type,
      label: 'Compilation Success',
      value: state.assignment.task.meta.id,
    });
  case assignmentActions.SUBMIT_ANSWER_REQUEST:
    if (action.payload.correct_answer) {
      timingReporter('Solving Time', {
        variable: 'Solved',
        label: `Assignment ID ${state.assignment.task.meta.id}`,
        value: Date.now() - state.assignment.timing.start,
      });
      return reporter('Submiting', {
        type: action.type,
        label: 'Correct Answer',
        value: state.assignment.task.meta.id,
      });
    }
    timingReporter('Solving Time', {
      variable: 'Skipped',
      label: `Assignment ID ${state.assignment.task.meta.id}`,
      value: Date.now() - state.assignment.timing.start,
    });
    return reporter('Submiting', {
      type: action.type,
      label: 'Incorrect Answer',
      value: state.assignment.task.meta.id,
    });
  default:
    return false;
  }
};

const middleware = middlewareAPI => {
  return next => {
    return action => {
      dispatchAnalyticsAction(action, middlewareAPI.getState());
      return next(action);
    };
  };
};

export default middleware;
