from django.contrib import messages
from django.shortcuts import redirect, render
from django.db import IntegrityError, transaction

from .models import *
from .forms import *


# Create your views here.

def dashboard(request):
    return redirect('coinpass:login') # render(request, 'dashboard/index.html')

def index(request):

    # Checking  an existing session before rendering the template. 
    # If not the user is redirected to the login page.
    if 'user_session' in request.session:
        session = request.session['user_session']
        print(session)
        request.session.set_expiry(1800)
        print(request.session.get_expiry_age())
        user_info = user.objects.get(email=session)
        account_info = account.objects.get(user_a_id = user_info.pk)
        context = {
            'user' : user_info,
            'account' : account_info,
        }
        # del request.session['user_session']
        
        return render(request, 'dashboard/index.html', context)
    else:
        return dashboard(request)

def invest(request):
    
    # Checking an existing session before rendering the template. 
    # If not the user is redirected to the login page.
    if 'user_session' in request.session:
        session = request.session['user_session']
        print(session)
        request.session.get_expiry_age()
        print(request.session.get_expiry_age())
        # del request.session['user_session']
        user_info = user.objects.get(email=session)
        account_info = account.objects.get(user_a_id = user_info.pk)
        context = {
            'user' : user_info,
            'account' : account_info,
            # 'invests' : deposit.objects.all(accountDep = account_info.pk),
        }

        if request.method == 'POST':
            invest = deposits(request.POST)
            if invest.is_valid():
                messages.success(
                    request,
                    'Your invest have been submited. Please, copy the address below and send your invest there.',
                    "alert alert-success alert-dismissible"
                )
                return redirect('dashboard:index')
        else:
            context['invest'] = deposits()

        return render(request, 'dashboard/invest.html', context)
    else:
        return dashboard(request)

    
def withdraw(request):

    # Checking an existing session before rendering the template. 
    # If not the user is redirected to the login page.
    if 'user_session' in request.session:
        session = request.session['user_session']
        print(session)
        request.session.get_expiry_age()
        # del request.session['user_session']
        user_info = user.objects.get(email=session)
        account_info = account.objects.get(user_a_id = user_info.pk)
        context = {
            'user' : user_info,
            'account' : account_info,
            # 'withdrawals' : withdraw.objects.all(accountWth = account_info.pk),
        }

        if request.method == 'POST':
            withdraw = withdrawals(request.POST)
            if withdraw.is_valid():
                messages.success(
                    request,
                    'Your request for withdrawal have been submited. Please, wait while Administrators processing your demand.',
                    "alert alert-success alert-dismissible"
                )
                return redirect('dashboard:index')
        else:
            context['withdraw'] = withdrawals()

        return render(request, 'dashboard/withdraw.html', context)
    else:
        return dashboard(request)


def settings(request):
    return render(request, 'dashboard/settings.html')

def refferals(request):

    # Checking an existing session before rendering the template. 
    # If not the user is redirected to the login page.
    if 'user_session' in request.session:
        session = request.session['user_session']
        print(session)
        request.session.get_expiry_age()
        # del request.session['user_session']
        user_info = user.objects.get(email=session)
        account_info = account.objects.get(user_a_id = user_info.pk)
        context = {
            'user' : user_info,
            'account' : account_info,
        }

        return render(request, 'dashboard/refferals.html', context)
    else:
        return dashboard(request)


def user_profile(request):

    # Checking an existing session before rendering the template. 
    # If not the user is redirected to the login page.
    if 'user_session' in request.session:
        session = request.session['user_session']
        print(session)
        request.session.get_expiry_age()
        user_info = user.objects.get(email=session)
        account_info = account.objects.get(user_a_id = user_info.pk)

        # Form verification for updating user's informations __Start__

        if request.method == 'POST':
            user_settings = userSettings(request.POST)
            user_account_settings = userAccountSettings(request.POST)
            # check if form data is valid
            if user_settings.is_valid():
                name = user_settings.cleaned_data['name']
                phone = user_settings.cleaned_data['phone']
                image = user_settings.cleaned_data['image']
                password = user_account_settings.cleaned_data['password']

                with transaction.atomic():
                    try:
                        if name != '':
                            user.objects.get(
                                name = name,
                                phone = phone,
                                image = image,
                            )
                        if phone != '':
                            user.objects.get(
                                image = image,
                            )
                        if image != '':
                            user.objects.get(
                                image = image,
                            )
                        if password != '':
                            account.objects.update(password = password)
                    except IntegrityError:
                        user_settings.errors['internal'] = "Oups! Servers got errors. Please retry!!"
        else:
            user_settings = userSettings()
            user_account_settings = userAccountSettings()

        context = {
            'user' : user_info,
            'account' : account_info,
            'user_settings' : user_settings,
            'user_account_settings': user_account_settings,
            'errors' : user_settings.errors.items()
        }

        return render(request, 'dashboard/user_profile.html', context)

        # Form verification for updating user's informations __End__    

    else:
        return dashboard(request)

        
