import ReactGA from 'react-ga';
import { browserHistory } from 'react-router';
import { ANALYTICS_KEY } from './constants';

export default () => {
  ReactGA.initialize(ANALYTICS_KEY, { debug: process.env.NODE_ENV === 'development' });
  browserHistory.listen(location => {
    ReactGA.pageview(location.pathname);
    ReactGA.set({ page: location.pathname });
  });
};
