from django.conf import settings
from django.db import IntegrityError, transaction
from django.contrib import messages
from django.core.mail import send_mail, EmailMultiAlternatives
from django.shortcuts import redirect, render
from django.template.loader import get_template

from .forms import *

# Create your views here.

def index(request):
    return render(request, 'coinpass/index.html')

def f_password(request):
    context = {}

    if request.method == 'POST':
        user_reg = user_login(request.POST)
        # check if form data is valid
        if user_reg.is_valid():
            email = user_reg.cleaned_data['email']
            if user.objects.filter(email=email).exists():

                # alert message to tell to the user that his form have been submitted

                messages.success(
                    request,
                    'An email have been sended. Please, fill out your mail box and reset your password.',
                    "alert alert-success alert-dismissible"
                )

                # email system start
                ## Here we are sending an email to user in other for him to confirm his email

                subject = "[Coinpass Investment Platform]Reset your password"
                from_email = settings.EMAIL_HOST_USER
                to_email = [email]
                html_template = get_template("coinpass/mails/auth-reset.html").render()

                confirm_email = EmailMultiAlternatives(subject=subject, from_email=from_email, to=to_email)
                confirm_email.attach_alternative(html_template, "text/html")

                confirm_email.send()
                
                # email system end

                redirect('index')

            else:
                user_reg.errors['internal'] = "User with this email not exists!!"

    else:
        user_reg = user_login()

    context = {
        'user_reg' : user_reg,
        'errors' : user_reg.errors.items()
    }
     
    return render(request, 'coinpass/auths/auth-forgot.html', context)

def r_password(request):

    if request.method == 'POST':
        password = request.POST.get('password')
        log = account.objects.get(user_a_id=user.objects.get().pk)

    context = {
        'user_log' : account_login()
    }

    return render(request, 'coinpass/auths/auth-reset.html', context)

def r_success(request):
    return render(request, 'coinpass/auths/auth-success.html')

def login(request):
    context = {}

    if request.method == 'POST':
        user_reg = user_login(request.POST)
        # check if form data is valid
        if user_reg.is_valid():
            email = user_reg.cleaned_data['email']
            password = request.POST.get('password')

            with transaction.atomic():
                try:
                    # check if the entered email exists
                    if user.objects.filter(email=email).exists():
                        # get the linked account for this user
                        log = account.objects.get(user_a_id=user.objects.get(email=email).pk)
                        # check if passwords matched
                        if log.password == password:
                            
                            # current.objects.create(
                            #     email_c = email
                            # )

                            request.session['user_session'] = email
                            return redirect('dashboard:index')
                except IntegrityError:
                    user_reg.errors['internal'] = "Email or Password incorrect!!"
    else:
        user_reg = user_login()

    context = {
        'user_log' :  account_login(),
        'user_reg' : user_reg,
        'errors' : user_reg.errors.items()
    }

    return render(request, 'coinpass/auths/auth-login.html', context)

def register(request):
    context = {}

    if request.method == 'POST':
        user_reg = user_register(request.POST)
        # check if form data is valid
        if user_reg.is_valid():
            print('jaja')
            email = user_reg.cleaned_data['email']
            name = user_reg.cleaned_data['name']
            phone = user_reg.cleaned_data['phone']
            # image = user_reg.cleaned_data['image']
            # user_dad = user_reg.cleaned_data['user_dad']
            password = request.POST.get('password')

            with transaction.atomic():
                try:
                    # if our user is not registered, create a new one with his account
                    if not user.objects.filter(email=email).exists():
                        user1 = user.objects.create(
                            name = name,
                            phone = phone,
                            email = email,
                            # user_dad = user_dad,
                            # image = image,
                        )

                        account.objects.create(
                            password = password,
                            user_a = user1
                        )
                        
                        # alert message to tell to the user that his form have been submitted

                        messages.success(
                            request,
                            'Your form have been submited. Please, fill out your mail box an confirm your email.',
                            "alert alert-success alert-dismissible"
                        )

                        # email system start
                        ## Here we are sending an email to user in other for him to confirm his email

                        subject = "[Coinpass Investment Platform] Please corfirm your password"
                        from_email = settings.EMAIL_HOST_USER
                        to_email = [email]
                        html_template = get_template("coinpass/mails/auth-confirm.html").render()

                        confirm_email = EmailMultiAlternatives(subject=subject, from_email=from_email, to=to_email)
                        confirm_email.attach_alternative(html_template, "text/html")

                        confirm_email.send()
                        
                        # email system end
            
                    else:
                        user_reg.errors['internal'] = "User with this email already exists!!"

                except IntegrityError:
                    user_reg.errors['internal'] = "Oups! Servers got errors. Please retry!!"
    else:
        user_reg = user_register()

    context = {
        'user_log' :  account_login(),
        'user_reg' : user_reg,
        'errors' : user_reg.errors.items()
    }

    return render(request, 'coinpass/auths/auth-register.html', context)

def you(request):
    return render(request, 'coinpass/mails/auth-reset.html')
