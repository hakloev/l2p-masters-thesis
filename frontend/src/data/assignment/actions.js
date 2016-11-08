export const GET_ASSIGNMENT_TYPES_REQUEST = 'assignment/GET_TYPES_REQUEST';
export const GET_ASSIGNMENT_TYPES_SUCCESS = 'assignment/GET_TYPES_SUCCESS';
export const GET_ASSIGNMENT_TYPES_FAILURE = 'assignment/GET_TYPES_FAILURE';

export const SET_CHOSEN_ASSIGNMENT_TYPES = 'assignment/SET_CHOSEN_TYPES';

export const START_QUIZ_REQUEST = 'assignment/START_QUIZ_REQUEST';
export const START_QUIZ_SUCCESS = 'assignment/START_QUIZ_SUCCESS';
export const START_QUIZ_FAILURE = 'assignment/START_QUIZ_FAILURE';

export const SUBMIT_ANSWER_REQUEST = 'assignment/SUBMIT_ANSWER_REQUEST';
export const SUBMIT_ANSWER_SUCCESS = 'assignment/SUBMIT_ANSWER_SUCCESS';
export const SUBMIT_ANSWER_FAILURE = 'assignment/SUBMIT_ANSWER_FAILURE';

export const COMPILE_CODE_REQUEST = 'assignment/COMPILE_CODE_REQUEST';
export const COMPILE_CODE_SUCCESS = 'assignment/COMPILE_CODE_SUCCESS';
export const COMPILE_CODE_FAILURE = 'assignment/COMPILE_CODE_FAILURE';

export const EDITOR_CODE_CHANGED = 'assignment/EDITOR_CODE_CHANGED';

/* ASSIGNMENT TYPES */
export const getAssignmentTypesRequest = () => ({
  type: GET_ASSIGNMENT_TYPES_REQUEST,
});

export const getAssignmentTypesSuccess = types => ({
  type: GET_ASSIGNMENT_TYPES_SUCCESS,
  types,
});

export const getAssignmentTypesFailure = message => ({
  type: GET_ASSIGNMENT_TYPES_FAILURE,
  message,
});

export const setChosenAssignmentTypes = types => ({
  type: SET_CHOSEN_ASSIGNMENT_TYPES,
  types,
});

/* START QUIZ */
export const startQuizRequest = payload => ({
  type: START_QUIZ_REQUEST,
  payload,
});

export const startQuizSuccess = data => ({
  type: START_QUIZ_SUCCESS,
  data,
});

export const startQuizFailure = message => {
  return {
    type: START_QUIZ_FAILURE,
    message,
  };
};

/* SUBMIT ANSWER */
export const submitAnswerRequest = payload => ({
  type: SUBMIT_ANSWER_REQUEST,
  payload,
});

export const submitAnswerSuccess = data => ({
  type: SUBMIT_ANSWER_SUCCESS,
  data,
});

export const submitAnswerFailure = error => ({
  type: SUBMIT_ANSWER_FAILURE,
  error,
});

/* COMPILE CODE */
export const compileCodeRequest = code => ({
  type: COMPILE_CODE_REQUEST,
  code,
});

export const compileCodeSuccess = result => ({
  type: COMPILE_CODE_SUCCESS,
  result,
});

export const compileCodeFailure = error => ({
  type: COMPILE_CODE_FAILURE,
  error,
});

/* EDITOR CODE */
export const editorCodeChanged = code => ({
  type: EDITOR_CODE_CHANGED,
  code,
});
