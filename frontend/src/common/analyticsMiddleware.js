import ReactGA from 'react-ga';
import { actions as assignmentActions } from '../data/assignment';

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
      label: 'Requesting compilation',
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
    console.log(Date.now() - state.assignment.timing.start);
    reporter('Assignment Solving Time', {
      type: action.type,
      label: `Solving time for assignment ID ${state.assignment.task.meta.id}`,
      value: Date.now() - state.assignment.timing.start,
    });

    if (action.payload.correct_answer) {
      return reporter('Submiting', {
        type: action.type,
        label: 'Correct Answer',
        value: state.assignment.task.meta.id,
      });
    }
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
