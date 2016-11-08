import { combineReducers } from 'redux';
import * as types from './actions';

const initalState = {
  skills: {
    isFetching: false,
    error: false,
    data: [],
  },
  streaks: {
    isFetching: false,
    error: false,
    data: [],
  },
};

const SkillReducer = (state = initalState.skills, action) => {
  switch (action.type) {
  case types.GET_SKILLS_REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case types.GET_SKILLS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      data: action.skills,
    };
  case types.GET_SKILLS_FAILURE:
    return {
      ...state,
      isFetching: false,
      data: [],
    };
  default:
    return state;
  }
};

const StreakReducer = (state = initalState.streaks, action) => {
  switch (action.type) {
  case types.GET_STREAKS_REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case types.GET_STREAKS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      data: action.streaks,
    };
  case types.GET_SKILLS_FAILURE:
    return {
      ...state,
      isFetching: false,
      data: [],
    };
  default:
    return state;
  }
};

const reducer = combineReducers({
  skills: SkillReducer,
  streaks: StreakReducer,
});

export default reducer;