import * as types from './actions';

const initalState = {
  reportModalOpen: false,
  achievementsModalOpen: false,
};

const ModalsReducer = (state = initalState, action) => {
  switch (action.type) {
  case types.TOGGLE_REPORT_MODAL:
    return {
      ...state,
      reportModalOpen: !state.reportModalOpen,
    };
  case types.TOGGLE_ACHIEVEMENTS_MODAL:
    return {
      ...state,
      achievementsModalOpen: !state.achievementsModalOpen,
    };
  default:
    return state;
  }
};

export default ModalsReducer;
