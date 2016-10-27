export const REPORT_ISSUE = 'REPORT_ISSUE';
export const reportIssue = payload => {
  return {
    type: REPORT_ISSUE,
    payload,
  };
};

export const REPORT_ISSUE_SUCCESS = 'REPORT_ISSUE_SUCCESS';
export const reportIssueSuccess = payload => ({
  type: REPORT_ISSUE_SUCCESS,
  payload,
});
