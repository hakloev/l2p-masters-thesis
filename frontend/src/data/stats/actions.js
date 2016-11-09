export const GET_ALL_QUIZ_STATS = 'stats/GET_ALL';

export const GET_ASSIGNMENT_TYPE_STREAKS_REQUEST = 'stats/ASSIGNMENT_TYPE_STREAKS_REQUEST';
export const GET_ASSIGNMENT_TYPE_STREAKS_SUCCESS = 'stats/ASSIGNMENT_TYPE_STREAKS_SUCCESS';
export const GET_ASSIGNMENT_TYPE_STREAKS_FAILURE = 'stats/ASSIGNMENT_TYPE_STREAKS_FAILURE';

export const GET_USER_STREAK_REQUEST = 'stats/USER_STREAK_REQUEST';
export const GET_USER_STREAK_SUCCESS = 'stats/USER_STREAK_SUCCESS';
export const GET_USER_STREAK_FAILURE = 'stats/USER_STREAK_FAILURE';

export const getAllQuizStats = () => {
  return {
    type: GET_ALL_QUIZ_STATS,
  };
};

/* ASSIGNMENT TYPE STREAKS */
export const getAssignmentTypeStreaksRequest = () => ({ type: GET_ASSIGNMENT_TYPE_STREAKS_REQUEST });

export const getAssignmentTypeStreaksSuccess = streaks => ({
  type: GET_ASSIGNMENT_TYPE_STREAKS_SUCCESS,
  streaks,
});

export const getAssignmentTypeStreaksFailure = message => ({
  type: GET_ASSIGNMENT_TYPE_STREAKS_FAILURE,
  message,
});

/* USER STREAK REQUEST */
export const getUserStreakRequest = () => ({ type: GET_USER_STREAK_REQUEST });

export const getUserStreakSuccess = streaks => ({
  type: GET_USER_STREAK_SUCCESS,
  streaks,
});

export const getUserStreakFailure = message => ({
  type: GET_USER_STREAK_FAILURE,
  message,
});
