import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { reducer as auth } from './data/auth';
import { reducer as assignment } from './data/assignment';
import { reducer as achievements } from './data/achievements';
import { reducer as stats } from './data/stats';
import { reducer as report } from './data/issue';

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  assignment,
  achievements,
  stats,
  report,
});

export default rootReducer;
