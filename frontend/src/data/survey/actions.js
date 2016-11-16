export const POST_PROGRESS_SURVEY = 'survey/REQUEST';
export const POST_PROGRESS_SURVEY_SUCCESS = 'survey/SUCCESS';
export const POST_PROGRESS_SURVEY_FAILURE = 'survey/FAILURE';

export const postProgressSurvey = payload => {
  return {
    type: POST_PROGRESS_SURVEY,
    payload,
  };
};

export const postProgressSurveySuccess = payload => ({
  type: POST_PROGRESS_SURVEY_SUCCESS,
  payload,
});

export const postProgressSurveyFailure = message => ({
  type: POST_PROGRESS_SURVEY_FAILURE,
  message,
});
