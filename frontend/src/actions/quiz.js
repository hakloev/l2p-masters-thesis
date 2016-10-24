import { browserHistory } from 'react-router';

export const GET_ALL_QUIZ_STATS = 'GET_ALL_QUIZ_STATS';
export const getAllQuizStats = () => {
  return {
    type: GET_ALL_QUIZ_STATS,
  };
};

/* SKILLS  */
export const GET_SKILLS_REQUEST = 'GET_SKILLS_REQUEST';
export const getSkillsRequest = () => ({ type: GET_SKILLS_REQUEST });

export const GET_SKILLS_SUCCESS = 'GET_SKILLS_SUCCESS';
export const getSkillsSuccess = skills => ({
  type: GET_SKILLS_SUCCESS,
  skills,
});

export const GET_SKILLS_FAILURE = 'GET_SKILLS_FAILURE';
export const getSkillsFailure = message => ({
  type: GET_SKILLS_FAILURE,
  message,
});

/* STREAKS */
export const GET_STREAKS_REQUEST = 'GET_STREKS_REQUEST';
export const getStreaksRequest = () => ({ type: GET_STREAKS_REQUEST });

export const GET_STREAKS_SUCCESS = 'GET_STREAKS_SUCCESS';
export const getStreaksSuccess = streaks => ({
  type: GET_STREAKS_SUCCESS,
  streaks,
});

export const GET_STREAKS_FAILURE = 'GET_STREAKS_FAILURE';
export const getStreaksFailure = message => ({
  type: GET_STREAKS_FAILURE,
  message,
});

/* ASSIGNMENT TYPES */
export const GET_ASSIGNMENT_TYPES_REQUEST = 'GET_ASSIGNMENT_TYPES_REQUEST';
export const getAssignmentTypesRequest = () => ({ type: GET_ASSIGNMENT_TYPES_REQUEST });

export const GET_ASSIGNMENT_TYPES_SUCCESS = 'GET_ASSIGNMENT_TYPES_SUCCESS';
export const getAssignmentTypesSuccess = types => ({
  type: GET_ASSIGNMENT_TYPES_SUCCESS,
  types,
});

export const SET_CHOSEN_ASSIGNMENT_TYPES = 'SET_CHOSEN_ASSIGNMENT_TYPES';
export const setChosenAssignmentTypes = types => ({
  type: SET_CHOSEN_ASSIGNMENT_TYPES,
  types,
});

export const GET_ASSIGNMENT_TYPES_FAILURE = 'GET_ASSIGNMENT_TYPES_FAILURE';
export const getAssignmentTypesFailure = message => ({
  type: GET_ASSIGNMENT_TYPES_FAILURE,
  message,
});

/* START QUIZ */
export const START_QUIZ_REQUEST = 'START_QUIZ_REQUEST';
export const startQuizRequest = payload => ({
  type: START_QUIZ_REQUEST,
  payload,
});

export const START_QUIZ_SUCCESS = ' START_QUIZ_SUCCESS';
export const startQuizSuccess = data => {
  browserHistory.push('/quiz');
  return {
    type: START_QUIZ_SUCCESS,
    data,
  };
};

/* COMPILE CODE */
export const COMPILE_CODE_REQUEST = 'COMPILE_CODE_REQUEST';
export const compileCodeRequest = code => ({
  type: COMPILE_CODE_REQUEST,
  code,
});

export const COMPILE_CODE_SUCCESS = 'COMPILE_CODE_SUCCESS';
export const compileCodeSuccess = result => ({
  type: COMPILE_CODE_SUCCESS,
  result,
});

/* EDITOR CODE */
export const EDITOR_CODE_CHANGED = 'EDITOR_CODE_CHANGED';
export const editorCodeChanged = code => ({
  type: EDITOR_CODE_CHANGED,
  code,
});

/* SUBMIT ANSWER */
export const SUBMIT_ANSWER_REQUEST = 'SUBMIT_ANSWER_REQUEST';
export const submitAnswerRequest = payload => ({
  type: SUBMIT_ANSWER_REQUEST,
  payload,
});

export const SUBMIT_ANSWER_SUCCESS = 'SUBMIT_ANSWER_SUCCESS';
export const submitAnswerSuccess = data => ({
  type: SUBMIT_ANSWER_SUCCESS,
  data,
});
