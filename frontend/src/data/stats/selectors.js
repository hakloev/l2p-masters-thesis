import { createSelector } from 'reselect';

const getAssignment = state => {
  return state.assignment.task.meta;
};

const getAssignmentTypeStreakObjects = state => state.stats.data.assignmentTypeStreaks;

export const getAssignmentTypeStreaks = createSelector(
  [getAssignment, getAssignmentTypeStreakObjects],
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
