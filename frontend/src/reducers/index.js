import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import assignment from './assignment';
import achievements from './achievements';
import compilation from './compilation';
import stats from '././stats';

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  assignment,
  achievements,
  compilation,
  stats,
});

export default rootReducer;
