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
from rest_framework_jwt.views import obtain_jwt_token

from api.views.achievement import AchievementViewSet, UserAchievementListView
from api.views.user import UserViewSet
from api.views.score import UserSkillsListView, UserScoreListView
from api.views.assignment import AssignmentTypeViewSet, AssignmentViewSet, CompileCode, SubmitCode, GetAssignment, check_for_new_achievements

#  admin.autodiscover()

router = routers.DefaultRouter()
router.register('achievements', AchievementViewSet)
router.register('assignment-types', AssignmentTypeViewSet)
router.register(r'userr', UserViewSet)

api_urls = [
	url(r'^', include(router.urls)),

    url(r'^compile/$', CompileCode.as_view(), name='compile-code'),
    url(r'^submit/$', SubmitCode.as_view(), name='submit-code'),

    url(r'^user/skills/$', UserSkillsListView.as_view(), name='user-skills'),
    url(r'^user/scores/$', UserScoreListView.as_view(), name='user-scores'),
    url(r'^user/achievements/$', UserAchievementListView.as_view(), name='user-achievements'),
    url(r'^user/achievements/new/$', check_for_new_achievements, name='user-new-achievements'),

    url(r'^assignments/$', AssignmentViewSet.as_view(), name='assignments'),
    url(r'^assignment/new/$', GetAssignment.as_view(), name='get-assignment'),
]

urlpatterns = [
    url(r'^admin/', admin.site.urls),

	#  API specific routes
    url(r'^auth/token/$', obtain_jwt_token),
	url(r'^api/', include(api_urls, namespace='api')),

	# Ensure that this view is last and accept all routes in order to work
    # with react-router
    url(r'', TemplateView.as_view(template_name='index.html'), name='index'),
]