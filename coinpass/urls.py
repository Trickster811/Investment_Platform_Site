from django.urls import re_path
from . import views


urlpatterns = [
    re_path(r'login/', views.login, name='login'),
    re_path(r'register/', views.register, name='register'),
    re_path(r'f_password/', views.f_password, name='f_password'),
    re_path(r'r_password/', views.r_password, name='r_password')
]