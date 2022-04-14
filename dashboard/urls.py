from django.urls import re_path
from . import views


urlpatterns = [
    re_path(r'log/', views.dashboard, name='dashboard'),
    re_path(r'Dashboard/', views.index, name='index'),
    re_path(r'Invest/', views.invest, name='invest'),
    re_path(r'Withdraw/', views.withdraw, name='withdraw'),
    re_path(r'Refferals/', views.refferals, name='refferals'),
    re_path(r'Account Setting/', views.user_profile, name='user_profile'),
    # re_path(r'settings/', views.settings, name='settings')
]