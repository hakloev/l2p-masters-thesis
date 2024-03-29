import { combineReducers } from 'redux';
import * as actions from './actions';

const initalState = {
  timing: {
    start: null,
  },
  task: {
    isFetching: false,
    meta: {
      id: null,
      is_public: false,
      resource_url: '',
      title: '',
      assignment_text: '',
      hint_text: '',
      code_body: '',
      solution: '',
      assignment_type: '',
    },
  },
  types: {
    isFetching: false,
    data: [],
    chosenTypes: [],
    hasExamQuestions: false,
  },
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

const TimingReducer = (state = initalState.timing, action) => {
  switch (action.type) {
  case actions.SET_START_ASSIGNMENT_TIME:
    return {
      ...state,
      start: Date.now(),
    };
  default:
    return state;
  }
};

const AssignmentReducer = (state = initalState.task, action) => {
  switch (action.type) {
  case actions.START_QUIZ_REQUEST:
    return {
      ...state,
      isFetching: true,
      meta: {
        ...state.meta,
      },
    };
  case actions.START_QUIZ_SUCCESS:
    return {
      ...state,
      isFetching: false,
      meta: {
        ...state.meta,
        ...action.data.assignment,
      },
    };
  case actions.SUBMIT_ANSWER_REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case actions.SUBMIT_ANSWER_SUCCESS:
    return {
      ...state,
      isFetching: false,
      meta: {
        ...state.meta,
        ...action.data.assignment,
      },
    };
  default:
    return state;
  }
};

const AssignmentTypeReducer = (state = initalState.types, action) => {
  switch (action.type) {
  case actions.GET_ASSIGNMENT_TYPES_REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case actions.GET_ASSIGNMENT_TYPES_SUCCESS:
    return {
      ...state,
      isFetching: false,
      data: action.types.filter(t => !t.type_name.toLowerCase().includes('exam')),
      hasExamQuestions: action.types.some(t => t.type_name.toLowerCase().includes('exam')),
    };
    // TODO: FAILURE
  case actions.SET_CHOSEN_ASSIGNMENT_TYPES:
    return {
      ...state,
      chosenTypes: action.types,
    };
  default:
    return state;
  }
};

const CompilationReducer = (state = initalState.compilation, action) => {
  switch (action.type) {
  case actions.COMPILE_CODE_REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case actions.COMPILE_CODE_SUCCESS:
    return {
      ...state,
      result: {
        ...state.result,
        ...action.result,
      },
      isFetching: false,
    };
  case actions.COMPILE_CODE_FAILURE:
    return {
      ...state,
      result: {
        ...initalState.compilation.result,
      },
      isFetching: false,
    };
  case actions.SUBMIT_ANSWER_SUCCESS:
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
  case actions.EDITOR_CODE_CHANGED:
    return {
      ...state,
      value: action.code,
    };
  case actions.SUBMIT_ANSWER_SUCCESS:
    return {
      ...state,
      value: action.data.assignment.code_body,
    };
  case actions.START_QUIZ_SUCCESS:
    return {
      ...state,
      value: action.data.assignment.code_body,
    };
  default:
    return state;
  }
};


const reducer = combineReducers({
  timing: TimingReducer,
  task: AssignmentReducer,
  types: AssignmentTypeReducer,
  compilation: CompilationReducer,
  editor: EditorReducer,
});

export default reducer;
