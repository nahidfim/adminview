from django.db import models
from django.core.validators import FileExtensionValidator
from django.utils import timezone
import datetime
import os

# Create your models here.

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return self.first_name

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email


class order_transactions(models.Model):
    order_no = models.CharField(max_length=100, primary_key=True)
    product_name_en = models.CharField(max_length=30)
    lane_no = models.IntegerField(max_length=5)
    table_no = models.IntegerField(max_length=5)
    language_type = models.CharField(max_length=30)
    product_code = models.CharField(max_length=30)
    product_unit_price = models.CharField(max_length=30)
    order_amount = models.IntegerField(max_length=30)
    status = models.CharField(max_length=30, default="active")
    order_time = models.DateTimeField(default=datetime.datetime.utcnow())
    provider_operator_code = models.CharField(max_length=30)
    provision_completion_flag = models.BooleanField(default=False)
    delivery_completion_time = models.TimeField(
        default=datetime.datetime.utcnow())
    order_cancellation_flag = models.BooleanField(default=False)
    order_cancellation_time = models.TimeField(
        default=datetime.datetime.utcnow())
    product_image_link_dest = models.TextField(max_length=50)


def get_pdf_url(instance, filename):
    return os.path.join('', filename)


class OrderTransactionPDF(models.Model):
    pdf_file = models.FileField(blank=True, null=True,
                                validators=[FileExtensionValidator(
                                    allowed_extensions=['pdf'])])
    transaction_time = models.DateTimeField(default=datetime.datetime.utcnow())


class OrderTransactionItemPDF(models.Model):
    pdf_file = models.FileField(blank=True, null=True,
                                validators=[FileExtensionValidator(
                                    allowed_extensions=['pdf'])])
    transaction_time = models.DateTimeField(default=datetime.datetime.utcnow())


class OrderTransactionExcel(models.Model):
    transaction_time = models.DateTimeField(default=timezone.now)
    excel_file = models.FileField(upload_to='excel_files/')

    def __str__(self):
        return f"Excel file created at {self.transaction_time}"


class OrderTransactionItemExcel(models.Model):
    transaction_time = models.DateTimeField(default=timezone.now)
    excel_file = models.FileField(upload_to='excel_files/')

    def __str__(self):
        return f"Excel file created at {self.transaction_time}"


class company_master(models.Model):
    company_name = models.CharField(max_length=30, primary_key=True)
    post_number = models.CharField(max_length=30)
    address_1 = models.CharField(max_length=30)
    address_2 = models.CharField(max_length=30)
    phone = models.CharField(max_length=30)
    fax = models.CharField(max_length=30)
    mail = models.CharField(max_length=30)
    order_number_count = models.IntegerField()
    registration_time = models.TimeField(default=datetime.datetime.utcnow())


class product_category_master(models.Model):
    product_category_no = models.IntegerField(primary_key=True)
    product_category = models.CharField(max_length=30)
    product_category_name_en = models.CharField(max_length=30)
    product_category_name_jp = models.CharField(max_length=30)
    product_category_name_ch = models.CharField(max_length=30)
    registration_time = models.TimeField(default=datetime.datetime.utcnow())


class page_master(models.Model):
    class Meta:
        unique_together = (('tablet_page_no', 'category_page_no'),)
    tablet_page_no = models.IntegerField(primary_key=True)
    category_page_no = models.IntegerField()
    product_category_no = models.ManyToManyField(product_category_master,
                                                 verbose_name="Product Category Number")
    product_code = models.CharField(max_length=100)
    registration_time = models.TimeField(default=datetime.datetime.utcnow())


class product_info_master(models.Model):
    product_id = models.IntegerField(primary_key=True, auto_created=True)
    product_category_no = models.CharField(max_length=100, null=True)
    product_code = models.CharField(max_length=100, null=True)
    product_name_en = models.CharField(max_length=50)
    product_name_jp = models.CharField(max_length=50)
    product_name_ch = models.CharField(max_length=50)
    product_price_en = models.CharField(max_length=50)
    product_price_jp = models.CharField(max_length=50)
    product_price_ch = models.CharField(max_length=50)
    category_name = models.CharField(max_length=90, default="Sushi", null=True)
    page_number = models.IntegerField(max_length=90, default=1, null=True)
    registration_time = models.TimeField(default=datetime.datetime.utcnow())
    image = models.ImageField(default=None, upload_to='static/media')
    product_image_link_dest = models.TextField(max_length=50)


class message_master(models.Model):
    message_id = models.IntegerField(primary_key=True, auto_created=True)
    order_confirmation_message_en = models.CharField(max_length=100)
    order_confirmation_message_jp = models.CharField(max_length=100)
    order_confirmation_message_ch = models.CharField(max_length=100)
    stuff_call_message_en = models.CharField(max_length=100)
    stuff_call_message_jp = models.CharField(max_length=100)
    stuff_call_message_ch = models.CharField(max_length=100)
    confirm_checkout_message_en = models.CharField(max_length=100)
    confirm_checkout_message_jp = models.CharField(max_length=100)
    confirm_checkout_message_ch = models.CharField(max_length=100)


class operator_code_master(models.Model):
    operator_code = models.CharField(max_length=30)
    operator_name = models.CharField(max_length=30)
    operator_password = models.CharField(max_length=30)
    last_login = models.CharField(max_length=30)
    registration_time = models.TimeField(default=datetime.datetime.utcnow())


class admin_code_master(models.Model):
    admin_code = models.CharField(max_length=30)
    admin_name = models.CharField(max_length=30)
    admin_password = models.CharField(max_length=30)
    last_login = models.CharField(max_length=30)
    registration_time = models.TimeField(default=datetime.datetime.utcnow())
