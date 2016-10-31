import { combineReducers } from 'redux';
import {
  GET_ASSIGNMENT_TYPES_REQUEST,
  GET_ASSIGNMENT_TYPES_SUCCESS,
  SET_CHOSEN_ASSIGNMENT_TYPES,
  START_QUIZ_REQUEST,
  START_QUIZ_SUCCESS,
} from '../actions/assignment';
import {
  SUBMIT_ANSWER_SUCCESS,
} from '../actions/compilation';

const initalState = {
  task: {
    isFetching: false,
    meta: {},
  },
  types: {
    isFetching: false,
    data: [],
    chosenTypes: [],
  },
};

const AssignmentReducer = (state = initalState.task, action) => {
  switch (action.type) {
  case START_QUIZ_REQUEST:
    return {
      ...state,
      isFetching: true,
      meta: {
        ...state.meta,
      },
    };
  case START_QUIZ_SUCCESS:
    return {
      ...state,
      isFetching: false,
      meta: {
        ...state.meta,
        ...action.data.assignment,
      },
    };
  case SUBMIT_ANSWER_SUCCESS:
    return {
      ...state,
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
  case GET_ASSIGNMENT_TYPES_REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case GET_ASSIGNMENT_TYPES_SUCCESS:
    return {
      ...state,
      isFetching: false,
      data: action.types,
    };
    // TODO: FAILURE
  case SET_CHOSEN_ASSIGNMENT_TYPES:
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
