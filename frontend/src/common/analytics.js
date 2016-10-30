import ReactGA from 'react-ga';
import { browserHistory } from 'react-router';

export default () => {
  ReactGA.initialize('UA-86402640-1');
  browserHistory.listen(location => {
    ReactGA.pageview(location.pathname);
    ReactGA.set({ page: location.pathname });
  });
};
