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

export const COMPILE_CODE_FAILURE = 'COMPILE_CODE_FAILURE';
export const compileCodeFailure = error => ({
  type: COMPILE_CODE_FAILURE,
  error,
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

export const SUBMIT_ANSWER_FAILURE = 'SUBMIT_ANSWER_FAILURE';
export const submitAnswerFailure = error => ({
  type: SUBMIT_ANSWER_FAILURE,
  error,
});
