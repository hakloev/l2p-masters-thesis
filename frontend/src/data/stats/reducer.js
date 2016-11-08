import { combineReducers } from 'redux';
import * as types from './actions';

const initalState = {
  assignmentTypeStreak: {
    isFetching: false,
    error: false,
    data: [],
  },
  userStreak: {
    isFetching: false,
    error: false,
    data: {},
  },
};

const UserStreakReducer = (state = initalState.userStreak, action) => {
  switch (action.type) {
  case types.GET_USER_STREAK_REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case types.GET_USER_STREAK_SUCCESS:
    return {
      ...state,
      isFetching: false,
      data: {
        ...action.streaks,
      },
    };
  case types.GET_USER_STREAK_FAILURE:
    return {
      ...state,
      isFetching: false,
      data: {},
    };
  default:
    return state;
  }
};

const AssignmentTypeStreakReducer = (state = initalState.assignmentTypeStreak, action) => {
  switch (action.type) {
  case types.GET_ASSIGNMENT_TYPE_STREAKS_REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case types.GET_ASSIGNMENT_TYPE_STREAKS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      data: action.streaks,
    };
  case types.GET_ASSIGNMENT_TYPE_STREAKS_FAILURE:
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
  userStreak: UserStreakReducer,
  assignmentTypeStreak: AssignmentTypeStreakReducer,
});

export default reducer;
