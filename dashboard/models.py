from django.db import models

# Create your models here.

class current(models.Model):
    email_c = models.EmailField(max_length=100, null=False)

class user(models.Model):
    # user_dad  = models.ForeignKey('self', on_delete=models.DO_NOTHING, null=False, related_name='children')
    name = models.CharField('Full Name', max_length=50, null=False)
    phone = models.CharField('Phone', max_length=15, null=False)
    email = models.EmailField('Email', max_length=100, null=False)
    # image = models.ImageField('Picture', upload_to='static/dashboard/images/avatar', null=True)
    refferal_bonus = models.DecimalField('Refferal Bonus', max_digits=15, decimal_places=2, default=0, null=False)
    checkbox = models.BooleanField(default=True, null=False)

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

class account(models.Model):
    password = models.CharField('Password', max_length=20, null=False)
    level = models.PositiveSmallIntegerField('Level', default=1, null=False)
    amount = models.DecimalField('Amount', max_digits=15, decimal_places=2, default=0, null=False)
    user_a = models.OneToOneField(user ,on_delete=models.CASCADE, null=False)

    def __str__(self):
        return self.user_a
    
    class Meta:
        verbose_name = 'Account'
        verbose_name_plural = 'Accounts'

class deposit(models.Model):
    amountDep = models.DecimalField('Amount', max_digits=15, decimal_places=10, null=False)
    dateDep = models.DateTimeField('Date', auto_now_add=True, null=False)
    payerDep = models.CharField('Owner', max_length=100, null=False)
    statusDep = models.BooleanField('Status', default=False, null=False)
    accountDep = models.ForeignKey(account, on_delete=models.CASCADE) 

    class Meta:
        verbose_name = 'Deposit'
        verbose_name_plural = 'Deposits'

class withdrawal(models.Model):
    amountWth = models.DecimalField('Amount', max_digits=15, decimal_places=10, null=False)
    dateWth = models.DateTimeField('Date', auto_now_add=True, null=False)
    receiverWth = models.CharField('Receiver Accont', max_length=100, null=False)
    statusWth = models.BooleanField('Status', default=False, null=False)
    accountWth = models.ForeignKey(account, on_delete=models.CASCADE, null=False)

    class Meta:
        verbose_name = 'Withdrawal'
        verbose_name_plural = 'Withdrawals'

class type_plan(models.Model):
    nameTp = models.CharField('Name', max_length=10, null=False, unique=True)
    percentageTp = models.PositiveIntegerField('Percentage',null=False, unique=True)
    minimumTp = models.PositiveIntegerField('Minimum', null=False, unique=True)
    maximumTp = models.PositiveIntegerField('Maximum', null=True, unique=True)
    numberdayTp = models.PositiveIntegerField('Number of Days', null=False)

    class Meta:
        verbose_name = 'Plan'
        verbose_name_plural = 'Plans'

class plan(models.Model):
    amount = models.DecimalField('Amount', max_digits=15, decimal_places=10, null=False, unique=True)
    account_plan = models.ForeignKey(account, on_delete=models.CASCADE, null=False)
    type_plan = models.ForeignKey(type_plan, on_delete=models.CASCADE, null=False)

    class Meta:
        verbose_name = 'Invest'
        verbose_name_plural = 'Invests'

