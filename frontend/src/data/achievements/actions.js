export const GET_ACHIEVEMENTS_REQUEST = 'achievements/REQUEST';
export const GET_ACHIEVEMENTS_SUCCESS = 'achievements/SUCCESS';
export const GET_ACHIEVEMENTS_FAILURE = 'achievements/FAILURE';

export const GET_NEW_ACHIEVEMENTS_REQUEST = 'achievements/NEW_REQUEST';
export const GET_NEW_ACHIEVEMENTS_SUCCESS = 'achievements/NEW_SUCCESS';
export const GET_NEW_ACHIEVEMENTS_FAILURE = 'achievements/NEW_FAILURE';

// GET ALL ACHIEVEMENTS
export const getAchievementsRequest = () => ({
  type: GET_ACHIEVEMENTS_REQUEST,
});

export const getAchievementsSuccess = achievements => ({
  type: GET_ACHIEVEMENTS_SUCCESS,
  achievements,
});

export const getAchievementsFailure = message => ({
  type: GET_ACHIEVEMENTS_FAILURE,
  message,
});
// GET ALL ACHIEVEMENTS STOP

// GET ALL NEW ACHIEVEMENTS
export const getNewAchievementsRequest = () => ({
  type: GET_NEW_ACHIEVEMENTS_REQUEST,
});

export const getNewAchievementsSuccess = achievements => ({
  type: GET_NEW_ACHIEVEMENTS_SUCCESS,
  achievements,
});

export const getNewAchievementsFailure = message => ({
  type: GET_NEW_ACHIEVEMENTS_FAILURE,
  message,
});
// GET ALL NEW ACHIEVEMENTS STOP
