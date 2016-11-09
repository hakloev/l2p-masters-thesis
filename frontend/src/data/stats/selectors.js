import { createSelector } from 'reselect';

const getAssignment = state => {
  return state.assignment.task.meta;
};

const getAssignmentTypes = state => state.stats.assignmentTypeStreak.data;

export const getAssignmentTypeStreaks = createSelector(
  [getAssignment, getAssignmentTypes],
  (assignment, streaks) => {
    const currentTypes = streaks.filter(streak => {
      return streak.assignment_type === assignment.assignment_type;
    });

    if (currentTypes.length === 0) {
      return {};
    }
    return currentTypes[0];
  }
);
