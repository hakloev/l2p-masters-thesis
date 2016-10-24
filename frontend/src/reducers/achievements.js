import { combineReducers } from 'redux';
import * as types from '../actions/achievements';

const initalState = {
  newAchievements: {
    isFetching: false,
    meta: [],
  },
  achievements: {
    isFetching: false,
    meta: [],
  },
};

const AchievementsReducer = (state = initalState.achievements, action) => {
  switch (action.type) {
  case types.GET_ACHIEVEMENTS_REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case types.GET_ACHIEVEMENTS_SUCCESS:
    return {
      ...state,
      meta: [...action.achievements],
      isFetching: false,
    };
  default:
    return state;
  }
};

const NewAchievementsReducer = (state = initalState.newAchievements, action) => {
  switch (action.type) {
  case types.GET_NEW_ACHIEVEMENTS_REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case types.GET_NEW_ACHIEVEMENTS_SUCCESS:
    return {
      ...state,
      meta: [...action.achievements],
      isFetching: false,
    };
  default:
    return state;
  }
};

const reducer = combineReducers({
  achievements: AchievementsReducer,
  newAchievements: NewAchievementsReducer,
});

export default reducer;
