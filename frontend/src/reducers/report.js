import * as types from '../actions/issue';

const initalState = {
  report: {
    isFetching: false,
    error: false,
    data: [],
    success: false,
  },
};

const ReportReducer = (state = initalState.report, action) => {
  switch (action.type) {
  case types.REPORT_ISSUE:
    return {
      ...state,
      isFetching: true,
    };
  case types.REPORT_ISSUE_SUCCESS:
    return {
      ...state,
      isFetching: false,
      data: action.payload,
      success: true,
    };
  case types.REPORT_ISSUE_FAILURE:
    return {
      ...state,
      isFetching: false,
      success: false,
    };
  default:
    return state;
  }
};

export default ReportReducer;
