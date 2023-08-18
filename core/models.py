from django.db import models
import datetime

# Create your models here.


class order_transactions(models.Model):
    order_no = models.CharField(max_length=100, primary_key=True)
    lane_no = models.IntegerField(max_length=5)
    table_no = models.IntegerField(max_length=5)
    language_type = models.CharField(max_length=30)
    product_code = models.CharField(max_length=30)
    product_unit_price = models.CharField(max_length=30)
    order_amount = models.IntegerField(max_length=30)
    status = models.CharField(max_length=30, default="active")
    order_time = models.TimeField(default=datetime.datetime.utcnow())
    provider_operator_code = models.CharField(max_length=30)
    provision_completion_flag = models.BooleanField(default=False)
    delivery_completion_time = models.TimeField(default=datetime.datetime.utcnow())
    order_cancellation_flag = models.BooleanField(default=False)
    order_cancellation_time = models.TimeField(default=datetime.datetime.utcnow())


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
