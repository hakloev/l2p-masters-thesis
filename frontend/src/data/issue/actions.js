export const REPORT_ISSUE = 'issue/REQUEST';
export const REPORT_ISSUE_SUCCESS = 'issue/SUCCESS';
export const REPORT_ISSUE_FAILURE = 'issue/FAILURE';

export const reportIssue = (payload, isAssignmentForm = false) => {
  return {
    type: REPORT_ISSUE,
    payload,
    isAssignmentForm,
  };
};

export const reportIssueSuccess = payload => ({
  type: REPORT_ISSUE_SUCCESS,
  payload,
});

export const reportIssueFailure = message => ({
  type: REPORT_ISSUE_FAILURE,
  message,
});
