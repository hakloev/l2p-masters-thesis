import * as types from './actions';

const initalState = {
  isFetching: false,
  error: false,
  data: {
    userStreak: {},
    assignmentTypeStreaks: [],
  },
};

const UserStreakReducer = (state = initalState, action) => {
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
        userStreak: action.streaks.user_streak,
        assignmentTypeStreaks: action.streaks.assignment_type_streaks,
      },
    };
  case types.GET_USER_STREAK_FAILURE:
    return {
      ...state,
      isFetching: false,
      data: initalState.data,
    };
  default:
    return state;
  }
};

export default UserStreakReducer;
