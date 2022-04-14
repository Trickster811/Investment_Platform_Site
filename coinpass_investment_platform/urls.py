"""coinpass_ivestment_platform URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.urls import include, re_path
from django.contrib import admin
from django.urls import path
from coinpass import views
#from dashboard.views import index



urlpatterns = [
    re_path(r'^$', views.index, name='index'),
    # re_path(r'ggg/', index, name='index'),
    re_path(r'__debug__/', include('debug_toolbar.urls')),
    re_path(r'Home/', include(('coinpass.urls', 'coinpass'), namespace='coinpass')),
    re_path(r'^', include(('dashboard.urls', 'dashboard'), namespace='dashboard')),
    path(r'manage/', admin.site.urls),
]
