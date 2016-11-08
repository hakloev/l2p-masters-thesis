export const GET_ALL_QUIZ_STATS = 'stats/GET_ALL';

export const GET_SKILLS_REQUEST = 'stats/SKILLS_REQUEST';
export const GET_SKILLS_SUCCESS = 'stats/SKILLS_SUCCESS';
export const GET_SKILLS_FAILURE = 'stats/SKILLS_FAILURE';

export const GET_STREAKS_REQUEST = 'stats/STREAKS_REQUEST';
export const GET_STREAKS_SUCCESS = 'stats/STREAKS_SUCCESS';
export const GET_STREAKS_FAILURE = 'stats/STREAKS_FAILURE';

export const getAllQuizStats = () => {
  return {
    type: GET_ALL_QUIZ_STATS,
  };
};

/* SKILLS  */
export const getSkillsRequest = () => ({ type: GET_SKILLS_REQUEST });

export const getSkillsSuccess = skills => ({
  type: GET_SKILLS_SUCCESS,
  skills,
});

export const getSkillsFailure = message => ({
  type: GET_SKILLS_FAILURE,
  message,
});

/* STREAKS */
export const getStreaksRequest = () => ({ type: GET_STREAKS_REQUEST });

export const getStreaksSuccess = streaks => ({
  type: GET_STREAKS_SUCCESS,
  streaks,
});

export const getStreaksFailure = message => ({
  type: GET_STREAKS_FAILURE,
  message,
});
