import * as types from './actions';

const initalState = {
  progressSurvey: {
    isFetching: false,
    error: false,
    data: [],
    success: false,
  },
};

const ProgressSurveyReducer = (state = initalState.progressSurvey, action) => {
  switch (action.type) {
  case types.POST_PROGRESS_SURVEY:
    return {
      ...state,
      isFetching: true,
    };
  case types.POST_PROGRESS_SURVEY_SUCCESS:
    return {
      ...state,
      isFetching: false,
      data: action.payload,
      success: true,
    };
  case types.POST_PROGRESS_SURVEY_FAILURE:
    return {
      ...state,
      isFetching: false,
      success: false,
    };
  default:
    return state;
  }
};

export default ProgressSurveyReducer;
