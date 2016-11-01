import { combineReducers } from 'redux';
import * as types from '../actions/compilation';
import { START_QUIZ_SUCCESS } from '../actions/assignment';

const initalState = {
  compilation: {
    isFetching: false,
    result: {
      error: '',
      timeout: false,
      output: '',
    },
  },
  editor: {
    value: 'Enter your code here',
  },
};

const ResultReducer = (state = initalState.compilation, action) => {
  switch (action.type) {
  case types.COMPILE_CODE_REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case types.COMPILE_CODE_SUCCESS:
    return {
      ...state,
      result: {
        ...state.result,
        ...action.result,
      },
      isFetching: false,
    };
  case types.COMPILE_CODE_FAILURE:
    return {
      ...state,
      result: {
        ...initalState.compilation.result,
      },
      isFetching: false,
    };
  case types.SUBMIT_ANSWER_SUCCESS:
    return {
      ...state,
      result: {
        ...initalState.compilation.result,
      },
    };
  default:
    return state;
  }
};

const EditorReducer = (state = initalState.editor, action) => {
  switch (action.type) {
  case types.EDITOR_CODE_CHANGED:
    return {
      ...state,
      value: action.code,
    };
  case types.SUBMIT_ANSWER_SUCCESS:
    return {
      ...state,
      value: action.data.assignment.code_body,
    };
  case START_QUIZ_SUCCESS:
    return {
      ...state,
      value: action.data.assignment.code_body,
    };
  default:
    return state;
  }
};

const reducer = combineReducers({
  result: ResultReducer,
  editor: EditorReducer,
});

export default reducer;
