from django.db import models

# Create your models here.

class current(models.Model):
    email_c = models.EmailField(max_length=100, null=False)

class user(models.Model):
    user_dad  = models.ForeignKey('self', on_delete=models.DO_NOTHING, null=False, related_name='children')
    name = models.CharField(max_length=50, null=False)
    phone = models.CharField(max_length=15, null=False)
    email = models.EmailField(max_length=100, null=False)
    image = models.ImageField(upload_to='static/dashboard/images/avatar', null=False)
    refferal_bonus = models.DecimalField(max_digits=15, decimal_places=2, default=0, null=False)
    checkbox = models.BooleanField(default=True, null=False)

    def __str__(self):
        return self.email

class account(models.Model):
    password = models.CharField(max_length=20, null=False)
    level = models.PositiveSmallIntegerField(default=1, null=False)
    amount = models.DecimalField(max_digits=15, decimal_places=2, default=0, null=False)
    user_a = models.OneToOneField(user ,on_delete=models.CASCADE, null=False)

    def __str__(self):
        return self.user_a

class deposit(models.Model):
    amountDep = models.DecimalField(max_digits=15, decimal_places=10, null=False)
    dateDep = models.DateTimeField(auto_now_add=True, null=False)
    payerDep = models.CharField(max_length=100, null=False)
    statusDep = models.BooleanField(default=False, null=False)
    accountDep = models.ForeignKey(account, on_delete=models.CASCADE) 

class withdrawal(models.Model):
    amountWth = models.DecimalField(max_digits=15, decimal_places=10, null=False)
    dateWth = models.DateTimeField(auto_now_add=True, null=False)
    receiverWth = models.CharField(max_length=100, null=False)
    statusWth = models.BooleanField(default=False, null=False)
    accountWth = models.ForeignKey(account, on_delete=models.CASCADE, null=False)

class type_plan(models.Model):
    nameTp = models.CharField(max_length=10, null=False, unique=True)
    percentageTp = models.PositiveIntegerField(null=False, unique=True)
    minimumTp = models.PositiveIntegerField(null=False, unique=True)
    maximumTp = models.PositiveIntegerField(null=True, unique=True)
    numberdayTp = models.PositiveIntegerField(null=False)

class plan(models.Model):
    amount = models.DecimalField(max_digits=15, decimal_places=10, null=False, unique=True)
    account_plan = models.ForeignKey(account, on_delete=models.CASCADE, null=False)
    type_plan = models.ForeignKey(type_plan, on_delete=models.CASCADE, null=False)

