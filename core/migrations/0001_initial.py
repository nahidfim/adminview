# Generated by Django 4.2 on 2024-02-08 07:18

import datetime
import django.core.validators
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='admin_code_master',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('admin_code', models.CharField(max_length=30)),
                ('admin_name', models.CharField(max_length=30)),
                ('admin_password', models.CharField(max_length=30)),
                ('last_login', models.CharField(max_length=30)),
                ('registration_time', models.TimeField(default=datetime.datetime(2024, 2, 8, 7, 18, 50, 777788))),
            ],
        ),
        migrations.CreateModel(
            name='company_master',
            fields=[
                ('company_name', models.CharField(max_length=30, primary_key=True, serialize=False)),
                ('post_number', models.CharField(max_length=30)),
                ('address_1', models.CharField(max_length=30)),
                ('address_2', models.CharField(max_length=30)),
                ('phone', models.CharField(max_length=30)),
                ('fax', models.CharField(max_length=30)),
                ('mail', models.CharField(max_length=30)),
                ('order_number_count', models.IntegerField()),
                ('registration_time', models.TimeField(default=datetime.datetime(2024, 2, 8, 7, 18, 50, 776769))),
            ],
        ),
        migrations.CreateModel(
            name='message_master',
            fields=[
                ('message_id', models.IntegerField(auto_created=True, primary_key=True, serialize=False)),
                ('order_confirmation_message_en', models.CharField(max_length=100)),
                ('order_confirmation_message_jp', models.CharField(max_length=100)),
                ('order_confirmation_message_ch', models.CharField(max_length=100)),
                ('stuff_call_message_en', models.CharField(max_length=100)),
                ('stuff_call_message_jp', models.CharField(max_length=100)),
                ('stuff_call_message_ch', models.CharField(max_length=100)),
                ('confirm_checkout_message_en', models.CharField(max_length=100)),
                ('confirm_checkout_message_jp', models.CharField(max_length=100)),
                ('confirm_checkout_message_ch', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='operator_code_master',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('operator_code', models.CharField(max_length=30)),
                ('operator_name', models.CharField(max_length=30)),
                ('operator_password', models.CharField(max_length=30)),
                ('last_login', models.CharField(max_length=30)),
                ('registration_time', models.TimeField(default=datetime.datetime(2024, 2, 8, 7, 18, 50, 777678))),
            ],
        ),
        migrations.CreateModel(
            name='order_transactions',
            fields=[
                ('order_no', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('product_name_en', models.CharField(max_length=30)),
                ('lane_no', models.IntegerField(max_length=5)),
                ('table_no', models.IntegerField(max_length=5)),
                ('language_type', models.CharField(max_length=30)),
                ('product_code', models.CharField(max_length=30)),
                ('product_unit_price', models.CharField(max_length=30)),
                ('order_amount', models.IntegerField(max_length=30)),
                ('status', models.CharField(default='active', max_length=30)),
                ('order_time', models.DateTimeField(default=datetime.datetime(2024, 2, 8, 7, 18, 50, 775947))),
                ('provider_operator_code', models.CharField(max_length=30)),
                ('provision_completion_flag', models.BooleanField(default=False)),
                ('delivery_completion_time', models.TimeField(default=datetime.datetime(2024, 2, 8, 7, 18, 50, 776075))),
                ('order_cancellation_flag', models.BooleanField(default=False)),
                ('order_cancellation_time', models.TimeField(default=datetime.datetime(2024, 2, 8, 7, 18, 50, 776084))),
                ('product_image_link_dest', models.TextField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='OrderTransactionExcel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transaction_time', models.DateTimeField(default=django.utils.timezone.now)),
                ('excel_file', models.FileField(upload_to='excel_files/')),
            ],
        ),
        migrations.CreateModel(
            name='OrderTransactionItemExcel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transaction_time', models.DateTimeField(default=django.utils.timezone.now)),
                ('excel_file', models.FileField(upload_to='excel_files/')),
            ],
        ),
        migrations.CreateModel(
            name='OrderTransactionItemPDF',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pdf_file', models.FileField(blank=True, null=True, upload_to='', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['pdf'])])),
                ('transaction_time', models.DateTimeField(default=datetime.datetime(2024, 2, 8, 7, 18, 50, 776385))),
            ],
        ),
        migrations.CreateModel(
            name='OrderTransactionPDF',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pdf_file', models.FileField(blank=True, null=True, upload_to='', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['pdf'])])),
                ('transaction_time', models.DateTimeField(default=datetime.datetime(2024, 2, 8, 7, 18, 50, 776260))),
            ],
        ),
        migrations.CreateModel(
            name='product_category_master',
            fields=[
                ('product_category_no', models.IntegerField(primary_key=True, serialize=False)),
                ('product_category', models.CharField(max_length=30)),
                ('product_category_name_en', models.CharField(max_length=30)),
                ('product_category_name_jp', models.CharField(max_length=30)),
                ('product_category_name_ch', models.CharField(max_length=30)),
                ('registration_time', models.TimeField(default=datetime.datetime(2024, 2, 8, 7, 18, 50, 776889))),
            ],
        ),
        migrations.CreateModel(
            name='product_info_master',
            fields=[
                ('product_id', models.IntegerField(auto_created=True, primary_key=True, serialize=False)),
                ('product_category_no', models.CharField(max_length=100, null=True)),
                ('product_code', models.CharField(max_length=100, null=True)),
                ('product_name_en', models.CharField(max_length=50)),
                ('product_name_jp', models.CharField(max_length=50)),
                ('product_name_ch', models.CharField(max_length=50)),
                ('product_price_en', models.CharField(max_length=50)),
                ('product_price_jp', models.CharField(max_length=50)),
                ('product_price_ch', models.CharField(max_length=50)),
                ('category_name', models.CharField(default='Sushi', max_length=90, null=True)),
                ('page_number', models.IntegerField(default=1, max_length=90, null=True)),
                ('registration_time', models.TimeField(default=datetime.datetime(2024, 2, 8, 7, 18, 50, 777331))),
                ('image', models.ImageField(default=None, upload_to='static/media')),
                ('product_image_link_dest', models.TextField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='UserAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='page_master',
            fields=[
                ('tablet_page_no', models.IntegerField(primary_key=True, serialize=False)),
                ('category_page_no', models.IntegerField()),
                ('product_code', models.CharField(max_length=100)),
                ('registration_time', models.TimeField(default=datetime.datetime(2024, 2, 8, 7, 18, 50, 777000))),
                ('product_category_no', models.ManyToManyField(to='core.product_category_master', verbose_name='Product Category Number')),
            ],
            options={
                'unique_together': {('tablet_page_no', 'category_page_no')},
            },
        ),
    ]
