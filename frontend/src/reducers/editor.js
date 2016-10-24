import * as types from '../actions/quiz';

const initalState = {
  editorValue: 'Enter your code here...',
};

const EditorReducer = (state = initalState, action) => {
  switch (action.type) {
  case types.EDITOR_CODE_CHANGED:
    return {
      ...state,
      editorValue: action.code,
    };
  case types.START_QUIZ_SUCCESS:
    return {
      ...state,
      editorValue: action.data.assignment.code_body,
    };
  case types.SUBMIT_ANSWER_SUCCESS:
    return {
      ...state,
      editorValue: action.data.assignment.code_body,
    };
  default:
    return state;
  }
};

export default EditorReducer;
