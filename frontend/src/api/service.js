import { TOKEN_IDENTIFIER } from '../common/constants';
import { checkStatus, errorHandle } from './auth';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const prepareRequest = (url, payload, method = 'GET') => {
  const token = localStorage.getItem(TOKEN_IDENTIFIER);
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `JWT ${token}`;
  }

  let body;
  if (payload) {
    body = JSON.stringify(payload);
  }

  const options = {
    method,
    headers,
    body,
  };

  return fetch(url, options)
    .then(checkStatus)
    .then(response => response.json())
    .then(response => {
      console.log('[fetch] URL: ', url);
      return response;
    })
    .catch(errorHandle);
};

export default {
  getSkills: () => prepareRequest('/api/user/skills/'),
  getStreaks: () => prepareRequest('/api/user/scores/'),
  getAchievements: () => prepareRequest('/api/user/achievements/'),
  getNewAchievements: () => prepareRequest('/api/user/achievements/new/'),
  getAssignmentTypes: () => prepareRequest('/api/assignment-types/'),
  getNewAssignment: formData => prepareRequest('/api/assignment/new/', formData, 'POST'),
  postAssignmentAnswer: formData => prepareRequest('/api/submit/', formData, 'POST'),
  postCompileCode: code => prepareRequest('/api/compile/', code, 'POST'),
  postReportIssue: formData => prepareRequest('/api/report/', formData, 'POST'),
};
