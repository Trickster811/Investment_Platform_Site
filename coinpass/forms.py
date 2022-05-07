from django.forms import CheckboxInput, FileInput, ModelForm, TextInput, NumberInput, EmailInput, PasswordInput
from dashboard.models import user, account

# Create your forms here

class user_login(ModelForm):
    class Meta:
        model = user
        fields = ['email']
        widgets = {
            'email' : EmailInput(attrs={'class' : 'form-control form-control-lg', 'id' : 'email-address', 'placeholder' : 'Enter your email address', 'required' : ''}),
        }

class user_register(ModelForm):
    class Meta:
        model = user
        fields = "__all__"
        exclude = ('refferal_bonus','image',) 
        widgets = {
            'name' : TextInput(attrs={'class' : 'form-control form-control-lg', 'id' : 'name', 'placeholder' : 'Enter your name', 'required' : ''}),
            'phone' : NumberInput(attrs={'class' : 'form-control form-control-lg', 'id' : 'phone', 'placeholder' : 'Enter your phone number', 'required' : ''}),
            'email' : EmailInput(attrs={'class' : 'form-control form-control-lg', 'id' : 'email', 'placeholder' : 'Enter your email address', 'required' : ''}),
            'checkbox' : CheckboxInput(attrs={'class' : 'custom-control-input', 'id' : 'checkbox', 'required' : ''}),
            # 'image' : FileInput(attrs={'class' : 'form-control form-control-lg', 'id' : 'image', 'placeholder' : 'Upload your profile pic', 'required' : ''}),
            # 'user_dad' : TextInput(attrs={'class' : 'form-control form-control-lg', 'id' : 'user_dad', 'placeholder' : 'Fill your refferal id', 'required' : ''}),
        }

class account_login(ModelForm):
    class Meta:
        model = account
        fields = ['password']
        widgets = {
            'password' : PasswordInput(attrs={'class' : 'form-control form-control-lg', 'id' : 'password', 'placeholder' : 'Enter your password', 'required' : ''}),
        }

