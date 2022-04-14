from django.contrib import admin

from .models import *

# Register your models here.

class DepositInline(admin.TabularInline):
    model = deposit
    fieldsets = [
        (None, {'fields': ['amountDep', 'dateDep', 'payerDep', 'accountDep']})
    ] # list columns

    extra = 0

class AccountInlines(admin.TabularInline):
    model = account
    filedset = [ 
        (None, {'fields': ['level', 'password']})
    ] # list columns

    extra = 0

@admin.register(account)
class AccountAdmin(admin.ModelAdmin):
    inlines = [DepositInline, ]

@admin.register(user)
class UserAdmin(admin.ModelAdmin):
    inlines = [AccountInlines, ]

