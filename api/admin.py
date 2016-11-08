from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from api.models.achievement import Achievement
from api.models.assignment import AssignmentType, Assignment
from api.models.score import StreakTracker, SkillTypeLevel, ScoreTypeTracker
from api.models.user import Student
from api.models.issue import Issue


class AchievementAdmin(admin.ModelAdmin):
    pass


class AssignmentAdmin(admin.ModelAdmin):
    list_display = ['title', 'assignment_type', 'is_public']
    fields = [
        'is_public',
        'resource_url',
        'assignment_type',
        'title',
        'assignment_text',
        'hint_text',
        'code_body',
        'solution',
    ]


class ScoreTypeTrackerAdmin(admin.ModelAdmin):
    list_display = ['user', 'assignment_type', 'current_streak', 'maximum_streak']


class SkillTypeLevelAdmin(admin.ModelAdmin):
    list_display = ['user', 'skill_level', 'assignment_type', 'this_level_correct', 'this_level_wrong']


class StreakTrackerAdmin(admin.ModelAdmin):
    list_display = ['user', 'streak', 'maximum_streak']


class StudentInline(admin.StackedInline):
    model = Student
    can_delete = False


class UserAdmin(BaseUserAdmin):
    inlines = (StudentInline,)

    def __init__(self, *args, **kwargs):
        super(BaseUserAdmin, self).__init__(*args, **kwargs)
        BaseUserAdmin.list_display = ('username', 'email', 'attend_survey', 'is_staff')

    def attend_survey(self, obj):
        return obj.student.attend_survey

    attend_survey.boolean = True


class IssueAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'assignmentId']


admin.site.register(Achievement)
admin.site.register(Assignment, AssignmentAdmin)
admin.site.register(AssignmentType)
admin.site.register(ScoreTypeTracker, ScoreTypeTrackerAdmin)
admin.site.register(SkillTypeLevel, SkillTypeLevelAdmin)
admin.site.register(StreakTracker, StreakTrackerAdmin)
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Issue, IssueAdmin)
