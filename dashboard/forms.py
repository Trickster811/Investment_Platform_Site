from django.forms import ModelForm, TextInput, NumberInput, BooleanField, EmailInput, PasswordInput
from . import models

# Create your forms here

class deposits(ModelForm):
    class Meta:
        model = models.deposit
        fields = ['amountDep', 'payerDep']
        widgets = {
            'amountDep' : NumberInput(attrs={'class' : 'form-control', 'placeholder' : 'Amount to invest', 'required' : ''}),
            'payerDep' : TextInput(attrs={'class' : 'form-control', 'placeholder' : 'Enter the payer address', 'required' : ''})
        }

class withdrawals(ModelForm):
    class Meta:
        model = models.withdrawal
        fields = ['amountWth', 'receiverWth']
        widgets = {
            'amountWth' : NumberInput(attrs={'class' : 'form-control', 'placeholder' : 'Amount to withdraw', 'required' : ''}),
            'receiverWth' : TextInput(attrs={'class' : 'form-control', 'placeholder' : 'Enter the receiver address', 'required' : ''})
        }