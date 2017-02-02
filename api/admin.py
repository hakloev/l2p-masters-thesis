from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from api.models.achievement import Achievement
from api.models.assignment import AssignmentType, Assignment, AssignmentSolvingAttempt
from api.models.score import UserStreakTracker, AssignmentTypeScoreTracker
from api.models.user import Student
from api.models.issue import Issue
from api.models.survey import ProgressSurvey


class AchievementAdmin(admin.ModelAdmin):
    pass


class AssignmentTypeInline(admin.TabularInline):
    model = Assignment.assignment_types.through
    extra = 1
    verbose_name = 'Assignment Type'
    verbose_name_plural = 'Assignment Types'


class AssignmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'is_public', 'get_assignment_types', 'difficulty_level')
    inlines = ( 
        AssignmentTypeInline,
    )
    fields = (
        'is_public',
        'title',
        'difficulty_level',
        'assignment_text',
        'code_body',
        'solution',
        'hint_text',
        'resource_url',
    )

    def get_assignment_types(self, obj):
        #  Create a string of all assignment types linked to the to current assignment
        return ', '.join([str(assignment_type) for assignment_type in obj.assignment_types.all()])
    get_assignment_types.short_description = 'Assignment Types'


class AssignmentSolvingAttemptAdmin(admin.ModelAdmin):
    list_display = ('user', 'get_assignment', 'correct_solution', )

    def get_assignment(self, obj):
        #  Get the assignment id and title for the list display
        return '{}: {}'.format(obj.assignment.id, obj.assignment.title)
    get_assignment.short_description = 'Assignment'


class AssignmentTypeScoreTrackerAdmin(admin.ModelAdmin):
    list_display = ('user', 'assignment_type', 'current_streak', 'maximum_streak')


class UserStreakTrackerAdmin(admin.ModelAdmin):
    list_display = ('user', 'streak', 'maximum_streak')


class StudentInline(admin.StackedInline):
    model = Student
    can_delete = False


class UserAdmin(BaseUserAdmin):
    inlines = (
        StudentInline,
    )

    def __init__(self, *args, **kwargs):
        super(BaseUserAdmin, self).__init__(*args, **kwargs)
        BaseUserAdmin.list_display = ('username', 'email', 'attend_survey', 'is_staff')

    def attend_survey(self, obj):
        #  Get the survey boolean for the list display
        return obj.student.attend_survey
    attend_survey.short_description = 'Wil attend survey?'
    attend_survey.boolean = True


class IssueAdmin(admin.ModelAdmin):
    list_display = ('get_name', 'email', 'get_assignment_id', 'created')

    def get_name(self, obj):
        return obj.name if obj.name != "" else 'Anonymous'
    get_name.short_description = 'Name'

    def get_assignment_id(self, obj):
        return obj.assignmentId.id if obj.assignmentId else ''
    get_assignment_id.short_description = 'Assignment'


admin.site.register(Achievement)
admin.site.register(Assignment, AssignmentAdmin)
admin.site.register(AssignmentSolvingAttempt, AssignmentSolvingAttemptAdmin)
admin.site.register(AssignmentType)
admin.site.register(AssignmentTypeScoreTracker, AssignmentTypeScoreTrackerAdmin)
admin.site.register(UserStreakTracker, UserStreakTrackerAdmin)
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Issue, IssueAdmin)
admin.site.register(ProgressSurvey)
