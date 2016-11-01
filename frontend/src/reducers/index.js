import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import assignment from './assignment';
import achievements from './achievements';
import editor from './editor';
import stats from '././stats';
import report from './report';

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  assignment,
  achievements,
  editor,
  stats,
  report,
});

export default rootReducer;
