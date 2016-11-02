import { createSelector } from 'reselect';
import { CODE_STRIP_REGEX } from '../common/constants';

const getAssignment = state => {
  return state.assignment.task.meta;
};
const getCompilationResult = state => state.compilation.result.result;

export const isCorrectSolution = createSelector(
  [getAssignment, getCompilationResult],
  (assignment, result) => {
    return assignment.solution.replace(CODE_STRIP_REGEX, '') === result.output.replace(CODE_STRIP_REGEX, '');
  }
);
