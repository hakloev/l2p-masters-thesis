import { combineReducers } from 'redux';
import { CODE_STRIP_REGEX } from '../common/constants';
import * as types from '../actions/quiz';

const initalState = {
  task: {
    meta: {
      isFetching: false,
    },
    answer: false,
    compilation: {
      isFetching: false,
      error: '',
      timeout: false,
      output: '',
    },
  },
  types: {
    isFetching: false,
    data: [],
    chosenTypes: [],
  },
};

const AssignmentReducer = (state = initalState.task, action) => {
  switch (action.type) {
  case types.START_QUIZ_REQUEST:
    return {
      ...state,
      meta: {
        ...state.meta,
        isFetching: true,
      },
    };
  case types.START_QUIZ_SUCCESS:
    return {
      ...state,
      meta: {
        ...state.meta,
        ...action.data.assignment,
        isFetching: false,
      },
    };
  case types.SUBMIT_ANSWER_SUCCESS:
    return {
      ...state,
      meta: {
        ...state.meta,
        ...action.data.assignment,
      },
      answer: false,
      compilation: {
        ...state.compilation,
        output: '',
      },
    };
  case types.COMPILE_CODE_REQUEST:
    return {
      ...state,
      compilation: {
        ...state.compilation,
        isFetching: true,
      },
    };
  case types.COMPILE_CODE_SUCCESS:
    return {
      ...state,
      compilation: {
        ...state.compilation,
        ...action.result,
        isFetching: false,
      },
      answer: state.meta.solution.replace(CODE_STRIP_REGEX, '') === action.result.output.replace(CODE_STRIP_REGEX, ''),
    };
  default:
    return state;
  }
};

const AssignmentTypeReducer = (state = initalState.types, action) => {
  switch (action.type) {
  case types.GET_ASSIGNMENT_TYPES_REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case types.GET_ASSIGNMENT_TYPES_SUCCESS:
    return {
      ...state,
      isFetching: false,
      data: action.types,
    };
    // TODO: FAILURE
  case types.SET_CHOSEN_ASSIGNMENT_TYPES:
    return {
      ...state,
      chosenTypes: action.types,
    };
  default:
    return state;
  }
};


const reducer = combineReducers({
  task: AssignmentReducer,
  types: AssignmentTypeReducer,
});

export default reducer;
