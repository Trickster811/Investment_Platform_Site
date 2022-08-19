from django.forms import CheckboxInput, FileInput, ModelForm, TextInput, NumberInput, BooleanField, EmailInput, PasswordInput
from .models import *

# Create your forms here

class deposits(ModelForm):
    class Meta:
        model = deposit
        fields = ['amountDep', 'payerDep']
        widgets = {
            'amountDep' : NumberInput(attrs={'class' : 'form-control', 'placeholder' : 'Amount to invest', 'required' : ''}),
            'payerDep' : TextInput(attrs={'class' : 'form-control', 'placeholder' : 'Enter the payer address', 'required' : ''})
        }

class withdrawals(ModelForm):
    class Meta:
        model = withdrawal
        fields = ['amountWth', 'receiverWth']
        widgets = {
            'amountWth' : NumberInput(attrs={'class' : 'form-control', 'placeholder' : 'Amount to withdraw', 'required' : ''}),
            'receiverWth' : TextInput(attrs={'class' : 'form-control', 'placeholder' : 'Enter the receiver address', 'required' : ''})
        }

class userSettings(ModelForm):
    class Meta:
        model = user
        fields = "__all__"
        exclude = ('refferal_bonus', 'checkbox', 'email') 
        widgets = {
            'name' : TextInput(attrs={'class' : 'form-control form-control-lg', 'id' : 'display-name', 'placeholder' : 'Enter your name', 'required' : 'false'}),
            'phone' : NumberInput(attrs={'class' : 'form-control form-control-lg', 'id' : 'phone-no', 'placeholder' : 'Enter your phone number', 'required' : 'false'}),
            # 'email' : EmailInput(attrs={'class' : 'form-control form-control-lg', 'id' : 'email', 'placeholder' : 'Enter your email address', 'required' : ''}),
            # 'checkbox' : CheckboxInput(attrs={'class' : 'custom-control-input', 'id' : 'checkbox', 'required' : ''}),
            'image' : FileInput(attrs={'class' : 'custom-file-input', 'id' : 'customFile', 'placeholder' : 'Upload your profile pic', 'required' : ''}),
            # 'user_dad' : TextInput(attrs={'class' : 'form-control form-control-lg', 'id' : 'user_dad', 'placeholder' : 'Fill your refferal id', 'required' : ''}),
        }

class userAccountSettings(ModelForm):
    class Meta:
        model = account
        fields = ['password']
        widgets = {
            'password' : PasswordInput(attrs={'class' : 'form-control form-control-lg', 'id' : 'password', 'placeholder' : '********************', 'required' : ''}),
        }