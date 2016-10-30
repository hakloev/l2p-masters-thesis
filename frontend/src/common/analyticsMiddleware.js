import ReactGA from 'react-ga';

const reporter = ({ type }) => {
  ReactGA.event({
    category: 'Custom Event',
    action: type,
  });
};

const dispatchAnalyticsAction = (action, state) => {
  switch (action.type) {
  case 'COMPILE_CODE_REQUEST':
    return reporter(action);
  case 'COMPILE_CODE_SUCCESS':
    return reporter(action);
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
