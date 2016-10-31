export const GET_ALL_QUIZ_STATS = 'GET_ALL_QUIZ_STATS';
export const getAllQuizStats = () => {
  return {
    type: GET_ALL_QUIZ_STATS,
  };
};

/* SKILLS  */
export const GET_SKILLS_REQUEST = 'GET_SKILLS_REQUEST';
export const getSkillsRequest = () => ({ type: GET_SKILLS_REQUEST });

export const GET_SKILLS_SUCCESS = 'GET_SKILLS_SUCCESS';
export const getSkillsSuccess = skills => ({
  type: GET_SKILLS_SUCCESS,
  skills,
});

export const GET_SKILLS_FAILURE = 'GET_SKILLS_FAILURE';
export const getSkillsFailure = message => ({
  type: GET_SKILLS_FAILURE,
  message,
});

/* STREAKS */
export const GET_STREAKS_REQUEST = 'GET_STREKS_REQUEST';
export const getStreaksRequest = () => ({ type: GET_STREAKS_REQUEST });

export const GET_STREAKS_SUCCESS = 'GET_STREAKS_SUCCESS';
export const getStreaksSuccess = streaks => ({
  type: GET_STREAKS_SUCCESS,
  streaks,
});

export const GET_STREAKS_FAILURE = 'GET_STREAKS_FAILURE';
export const getStreaksFailure = message => ({
  type: GET_STREAKS_FAILURE,
  message,
});
