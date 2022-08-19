from django.contrib import admin
from django.contrib.contenttypes.models import ContentType
from django.urls import reverse
from django.utils.safestring import mark_safe

from .models import *

# Register your models here.

class AdminURLMixin(object):

    def get_admin_url(self, obj):
        content_type = ContentType.objects.get_for_model(obj.__class__)
        return reverse('admin:dashboard_%s_change' % (content_type.model), args=(obj.id))

class  DepositInline(admin.TabularInline):
    model = deposit
    fieldsets = [
        (None, {'fields': ['amountDep', 'dateDep', 'payerDep', 'statusDep']})
        ] # list columns
    readonly_fields = ['amountDep', 'dateDep', 'payerDep']
    extra = 0
    verbose_name = 'Deposit'
    verbose_name_plural = 'Deposits'

    def has_add_permission(self, request):
        return False
    
    
class  WithdrawalInline(admin.TabularInline):
    model = withdrawal
    fieldsets = [
        (None, {'fields': ['amountWth', 'dateWth', 'receiverWth', 'statusWth']})
        ] # list columns
    readonly_fields = ['amountWth', 'dateWth', 'receiverWth',]
    extra = 0
    verbose_name = 'Withdrawal'
    verbose_name_plural = 'Withdrawals'

    def has_add_permission(self, request):
        return False
    
class  AccountInline(admin.TabularInline):
    model = account
    fieldsets = [
        (None, {'fields': ['level', 'amount', 'password']})
        ] # list columns
    readonly_fields = ['amount', 'password']
    extra = 0

    def has_add_permission(self, request):
        return False
    
@admin.register(user)
class UserAdmin(admin.ModelAdmin):
    readonly_fields = ['email', 'name', 'phone', 'refferal_bonus']
    inlines = [AccountInline, ]

    def has_add_permission(self, request):
        return False
        
@admin.register(account)
class AccountAdmin(admin.ModelAdmin):
    readonly_fields = ['amount', 'password']
    inlines = [DepositInline, WithdrawalInline, ]

    def has_add_permission(self, request):
        return False
    
@admin.register(deposit)
class DepositAdmin(admin.ModelAdmin):
    readonly_fields = ['dateDep']
    search_fields = ['dateDep', 'payerDep', 'accountDep_link', 'statusDep']
    list_filter = ['dateDep', 'statusDep']

    def has_add_permission(self, request):
        return False
    
    def accountDep_link(self, deposit):
        url = self.get_admin_url(deposit.accountDep)
        return mark_safe("<a href='{}'>{}</a>".format(url,deposit.accountDep.user_a))

@admin.register(withdrawal)
class WithdrawalAdmin(admin.ModelAdmin):
    readonly_fields = ['dateWth']
    search_fields = ['dateWth', 'receiverWth', 'accountWth_link', 'statusWth']
    list_filter = ['dateWth', 'statusWth']

    def has_add_permission(self, request):
        return False
    
    def accountWth_link(self, withdrawal):
        url = self.get_admin_url(withdrawal.accountWth)
        return mark_safe("<a href='{}'>{}</a>".format(url,withdrawal.accountWth.user_a))

@admin.register(plan)
class InvestAdmin(admin.ModelAdmin, AdminURLMixin):
    readonly_fields = ['amount', 'account_link', 'type_plan_link']

    def has_add_permission(self, request):
        return False
    
    def type_plan_link(self, plan):
        url = self.get_admin_url(plan.account_plan)
        return mark_safe("<a href='{}'>{}</a>".format(url,plan.type_plan.name))

    def account_link(self, plan):
        url = self.get_admin_url(plan.account_plan)
        return mark_safe("<a href='{}'>{}</a>".format(url,plan.account_plan.user_a))

@admin.register(type_plan)
class PlanAdmin(admin.ModelAdmin):
    search_fields = ['account_plan', 'type_plan']

