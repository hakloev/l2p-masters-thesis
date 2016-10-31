// GET ALL ACHIEVEMENTS
export const GET_ACHIEVEMENTS_REQUEST = 'GET_ACHIEVEMENTS_REQUEST';
export const getAchievementsRequest = () => ({
  type: GET_ACHIEVEMENTS_REQUEST,
});

export const GET_ACHIEVEMENTS_SUCCESS = 'GET_ACHIEVEMENTS_SUCCESS';
export const getAchievementsSuccess = achievements => ({
  type: GET_ACHIEVEMENTS_SUCCESS,
  achievements,
});

export const GET_ACHIEVEMENTS_FAILURE = 'GET_ACHIEVEMENTS_FAILURE';
export const getAchievementsFailure = message => ({
  type: GET_ACHIEVEMENTS_FAILURE,
  message,
});
// GET ALL ACHIEVEMENTS STOP

// GET ALL NEW ACHIEVEMENTS
export const GET_NEW_ACHIEVEMENTS_REQUEST = 'GET_NEW_ACHIEVEMENTS_REQUEST';
export const getNewAchievementsRequest = () => ({
  type: GET_NEW_ACHIEVEMENTS_REQUEST,
});

export const GET_NEW_ACHIEVEMENTS_SUCCESS = 'GET_NEW_ACHIEVEMENTS_SUCCESS';
export const getNewAchievementsSuccess = achievements => ({
  type: GET_NEW_ACHIEVEMENTS_SUCCESS,
  achievements,
});

export const GET_NEW_ACHIEVEMENTS_FAILURE = 'GET_NEW_ACHIEVEMENTS_FAILURE';
export const getNewAchievementsFailure = message => ({
  type: GET_NEW_ACHIEVEMENTS_FAILURE,
  message,
});
// GET ALL NEW ACHIEVEMENTS STOP
