import * as types from '../actions/reportIssue';

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
  // TODO: FAILURE
  default:
    return state;
  }
};

export default ReportReducer;

