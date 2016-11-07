export const REPORT_ISSUE = 'REPORT_ISSUE';
export const reportIssue = (payload, isAssignmentForm = false) => {
  return {
    type: REPORT_ISSUE,
    payload,
    isAssignmentForm,
  };
};

export const REPORT_ISSUE_SUCCESS = 'REPORT_ISSUE_SUCCESS';
export const reportIssueSuccess = payload => ({
  type: REPORT_ISSUE_SUCCESS,
  payload,
});

export const REPORT_ISSUE_FAILURE = 'REPORT_ISSUE_FAILURE';
export const reportIssueFailure = message => ({
  type: REPORT_ISSUE_FAILURE,
  message,
});
