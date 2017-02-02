"""l2p URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView

from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from api.views.achievement import UserAchievementListView
from api.views.user import StudentViewSet, RegistrationView
from api.views.score import UserStreakView
from api.views.issue import IssueViewSet
from api.views.survey import ProgressSurveyViewSet
from api.views.assignment import AssignmentTypeViewSet, AssignmentViewSet, check_for_new_achievements, compile_code, submit_code_for_assignment, start_quiz


admin.autodiscover()

router = routers.DefaultRouter()
router.register(r'assignment-types', AssignmentTypeViewSet)
router.register(r'student', StudentViewSet)
router.register(r'report', IssueViewSet)
router.register(r'survey', ProgressSurveyViewSet, base_name='survey')

api_urls = [
    url(r'^', include(router.urls)),

    url(r'^compile/$', compile_code, name='compile-code'),
    url(r'^submit/$', submit_code_for_assignment, name='submit-code'),

    url(r'^user/streak/$', UserStreakView.as_view(), name='user-streak'),
    url(r'^user/achievements/$', UserAchievementListView.as_view(), name='user-achievements'),
    url(r'^user/achievements/new/$', check_for_new_achievements, name='user-new-achievements'),

    url(r'^assignments/$', AssignmentViewSet.as_view(), name='assignments'),
    url(r'^assignment/new/$', start_quiz, name='start-quiz'),
    url(r'^report/$', IssueViewSet.as_view(), name='report-issue'),
]

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    #  API specific routes
    url(r'^auth/register/$', RegistrationView.as_view()),
    url(r'^auth/token/$', obtain_jwt_token),
    url(r'^auth/token/refresh/$', refresh_jwt_token),

    url(r'^api/', include(api_urls, namespace='api')),

    # Ensure that this view is last and accept all routes in order to work
    # with react-router
    url(r'', TemplateView.as_view(template_name='index.html'), name='index'),
]
