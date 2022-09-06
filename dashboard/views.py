from datetime import datetime
from django.contrib import messages
from django.shortcuts import redirect, render
from django.db import IntegrityError, transaction
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import get_template

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
        context = {}

        # Get status of any deposit
        if deposit.objects.filter(accountDep = account_info.pk, checkedDep = False, statusDep = True).exists():

            # Updating deposit element
            # deposit.objects.filter(accountDep = account_info.pk, checkedDep = False).update(checkedDep = True)

            deposit_info = deposit.objects.get(accountDep = account_info.pk, checkedDep = False, statusDep = True)

            deposit_info.checkedDep = True
            deposit_info.save()

            # Updating the account amount
            account_info.amount = account_info.amount + deposit_info.amountDep
            account_info.save()
            # account.objects.filter(user_a_id = user_info.pk).update(amount = withdrawal_info.checkedDep)
            print('Success Joachim!!')
        
        # Get status of any withdrawal
        if withdrawal.objects.filter(accountWth = account_info.pk, checkedWth = False, statusWth = True).exists():

            # Updating withdrawal element
            withdrawal.objects.filter(accountWth = account_info.pk, checkedWth = False, statusWth = True).update(checkedWth = True)

            # withdrawal_info = withdrawal.objects.get(accountWth = account_info.pk, checkedWth = False)

            # withdrawal_info.checkedWth = True
            # withdrawal_info.save()

            # account.objects.filter(user_a_id = user_info.pk).update(amount = withdrawal_info.checkedWth)
            print('Success Joachim!!')
        
        # Get status of any investment
        if currentInvestment.objects.filter(relatedAccount = account_info.pk, status = False).exists():
            invest_info = currentInvestment.objects.get(relatedAccount = account_info.pk, status =False)
            
            if invest_info.dateEnd < datetime.now():
                plan = type_plan.objects.get(pk = invest_info.type_plan)

                # Updating invest element
                # currentInvestment.objects.filter(accountDep = account_info.pk, status = False).update(status = True)

                currentInvestment.objects.filter(relatedAccount = account_info.pk, status = False).update(status = True)
                # invest_info.status = True
                # invest_info.save()

                # Updating the account amount
                account_info.amount = account_info.amount + invest_info.amountInvested + ((invest_info.amountInvested * plan.percentageTp)/100)
                account_info.save()
                
                print('Success Joachim!!')
            
            else:
                context['currentInvest'] = invest_info
        
        context['user'] = user_info
        context['account'] = account_info
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
            invest = invest_form(request.POST)
            if invest.is_valid():
                amountInvested = invest.cleaned_data['amountInvested']
                plan = invest.cleaned_data['type_plan']

                with transaction.atomic():
                    try:         
                        # Creating an investmant  __start__
                        
                        Tplan = type_plan.objects.get(nameTp = plan)

                        currentInvestment.objects.create(
                            amountInvested = amountInvested,
                            dateStart = datetime.now(),
                            dateEnd = datetime.now() + Tplan.numberdayTp,
                            # status
                            relatedAccount = account_info,
                            type_plan = plan,
                        )

                        # Updating the account amount
                        account_info.amount = account_info.amount - amountInvested
                        account_info.save()

                        # Creating an investmant  __end__
                        messages.success(
                            request,
                            'Your invest have been submited.',
                            "alert alert-success alert-dismissible"
                        )

                        # Redirecting to the main page
                        return render(request, 'dashboard/index.html', context)

                    except IntegrityError:
                        messages.error(
                            request,
                            'Error!!! Servers got errors. Please retry!!',
                            "alert alert-danger alert-dismissible"
                        )
                        withdrawal.errors['internal'] = "Oups! Servers got errors. Please retry!!"
                
        else:
            context['invest'] = invest_form()

        return render(request, 'dashboard/invest.html', context)
    else:
        return dashboard(request)

def deposit_view(request):

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
            deposite = deposit_form(request.POST)
            if deposite.is_valid():

                amountDep = deposite.cleaned_data['amountDep']
                payerDep = deposite.cleaned_data['payerDep']

                with transaction.atomic():
                    try:         
                        # Creating the deposit __start__

                        deposit.objects.create(
                            amountDep = amountDep,
                            dateDep = datetime.now(),
                            payerDep =payerDep,
                            # statusDep =, 
                            accountDep =account_info,
                        )

                        # Creating the deposit __end__

                        # email system start
                        ## Here we are sending an email to user in other for him to confirm his email

                        subject = "[Coinpass Investment Platform] You have a deposit request"
                        from_email = settings.EMAIL_HOST_USER
                        to_email = [user_info.email]
                        html_template = get_template("dashboard/mails/auth-confirm.html").render()

                        confirm_email = EmailMultiAlternatives(subject=subject, from_email=from_email, to=to_email)
                        confirm_email.attach_alternative(html_template, "text/html")

                        confirm_email.send()
                        
                        # email system end

                        # alert message to tell to the user that his form have been submitted

                        messages.success(
                            request,
                            'Success!!! Check your mails to process the deposit',
                            "alert alert-success alert-dismissible"
                        )

                        # Refreshing the page
                        return render(request, 'dashboard/deposit.html', context)
                
                    except IntegrityError:
                        messages.error(
                            request,
                            'Error!!! Servers got errors. Please retry!!',
                            "alert alert-danger alert-dismissible"
                        )
                        deposite.errors['internal'] = "Oups! Servers got errors. Please retry!!"
                
        else:
            context['deposit'] = deposit_form()

        return render(request, 'dashboard/deposit.html', context)
    else:
        return dashboard(request)
    
def withdraw_view(request):

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
            withdraw = withdrawal_form(request.POST)
            if withdraw.is_valid():
                amountWth = withdraw.cleaned_data['amountWth']
                receiverWth = withdraw.cleaned_data['receiverWth']

                with transaction.atomic():
                    try:         
                        # Creating the withdrawal __start__

                        withdrawal.objects.create(
                            amountWth = amountWth,
                            dateWth = datetime.now(),
                            receiverWth =receiverWth,
                            # statusDep =, 
                            accountWth =account_info,
                        )

                        # Creating the withdrawal __end__

                        # Updating the account amount
                        account_info.amount = account_info.amount - amountWth
                        account_info.save()

                        # email system start
                        ## Here we are sending an email to user in other for him to confirm his email

                        subject = "[Coinpass Investment Platform] You have requested a withdrawal"
                        from_email = settings.EMAIL_HOST_USER
                        to_email = [user_info.email]
                        html_template = get_template("dashboard/mails/auth-confirm.html").render()

                        confirm_email = EmailMultiAlternatives(subject=subject, from_email=from_email, to=to_email)
                        confirm_email.attach_alternative(html_template, "text/html")

                        confirm_email.send()
                        
                        # email system end

                        # alert message to tell to the user that his form have been submitted

                        messages.success(
                            request,
                            'Success!!! We are processing your request',
                            "alert alert-success alert-dismissible"
                        )

                        # Refreshing the page
                        return render(request, 'dashboard/withdraw.html', context)
                
                    except IntegrityError:
                        messages.error(
                            request,
                            'Error!!! Servers got errors. Please retry!!',
                            "alert alert-danger alert-dismissible"
                        )
                        withdrawal.errors['internal'] = "Oups! Servers got errors. Please retry!!"
        else:
            context['withdraw'] = withdrawal_form()

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

        return render(request, 'dashboard/test.html', context)

        # Form verification for updating user's informations __End__    

    else:
        return dashboard(request)
