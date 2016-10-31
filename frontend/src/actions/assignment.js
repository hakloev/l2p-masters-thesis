/* ASSIGNMENT TYPES */
export const GET_ASSIGNMENT_TYPES_REQUEST = 'GET_ASSIGNMENT_TYPES_REQUEST';
export const getAssignmentTypesRequest = () => ({
  type: GET_ASSIGNMENT_TYPES_REQUEST,
});

export const GET_ASSIGNMENT_TYPES_SUCCESS = 'GET_ASSIGNMENT_TYPES_SUCCESS';
export const getAssignmentTypesSuccess = types => ({
  type: GET_ASSIGNMENT_TYPES_SUCCESS,
  types,
});

export const GET_ASSIGNMENT_TYPES_FAILURE = 'GET_ASSIGNMENT_TYPES_FAILURE';
export const getAssignmentTypesFailure = message => ({
  type: GET_ASSIGNMENT_TYPES_FAILURE,
  message,
});

export const SET_CHOSEN_ASSIGNMENT_TYPES = 'SET_CHOSEN_ASSIGNMENT_TYPES';
export const setChosenAssignmentTypes = types => ({
  type: SET_CHOSEN_ASSIGNMENT_TYPES,
  types,
});

/* START QUIZ */
export const START_QUIZ_REQUEST = 'START_QUIZ_REQUEST';
export const startQuizRequest = payload => ({
  type: START_QUIZ_REQUEST,
  payload,
});

export const START_QUIZ_SUCCESS = ' START_QUIZ_SUCCESS';
export const startQuizSuccess = data => {
  return {
    type: START_QUIZ_SUCCESS,
    data,
  };
};
