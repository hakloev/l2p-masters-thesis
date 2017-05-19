import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toasterReducer } from 'react-redux-toastr';


import { reducer as auth } from './data/auth';
import { reducer as assignment } from './data/assignment';
import { reducer as achievements } from './data/achievements';
import { reducer as stats } from './data/stats';
import { reducer as report } from './data/issue';
import { reducer as survey } from './data/survey';
import { reducer as modals } from './data/modals';

const rootReducer = combineReducers({
  form: formReducer,
  toastr: toasterReducer,
  auth,
  assignment,
  achievements,
  stats,
  report,
  survey,
  modals,
});

export default rootReducer;
