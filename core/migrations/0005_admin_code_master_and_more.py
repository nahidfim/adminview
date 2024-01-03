# Generated by Django 4.0.7 on 2023-12-15 04:52

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_alter_company_master_registration_time_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='admin_code_master',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('operator_code', models.CharField(max_length=30)),
                ('operator_name', models.CharField(max_length=30)),
                ('operator_password', models.CharField(max_length=30)),
                ('last_login', models.CharField(max_length=30)),
                ('registration_time', models.TimeField(default=datetime.datetime(2023, 12, 15, 4, 52, 25, 960900))),
            ],
        ),
        migrations.AlterField(
            model_name='company_master',
            name='registration_time',
            field=models.TimeField(default=datetime.datetime(2023, 12, 15, 4, 52, 25, 958904)),
        ),
        migrations.AlterField(
            model_name='operator_code_master',
            name='registration_time',
            field=models.TimeField(default=datetime.datetime(2023, 12, 15, 4, 52, 25, 959905)),
        ),
        migrations.AlterField(
            model_name='order_transactions',
            name='delivery_completion_time',
            field=models.TimeField(default=datetime.datetime(2023, 12, 15, 4, 52, 25, 957789)),
        ),
        migrations.AlterField(
            model_name='order_transactions',
            name='order_cancellation_time',
            field=models.TimeField(default=datetime.datetime(2023, 12, 15, 4, 52, 25, 957789)),
        ),
        migrations.AlterField(
            model_name='order_transactions',
            name='order_time',
            field=models.TimeField(default=datetime.datetime(2023, 12, 15, 4, 52, 25, 957789)),
        ),
        migrations.AlterField(
            model_name='page_master',
            name='registration_time',
            field=models.TimeField(default=datetime.datetime(2023, 12, 15, 4, 52, 25, 958904)),
        ),
        migrations.AlterField(
            model_name='product_category_master',
            name='registration_time',
            field=models.TimeField(default=datetime.datetime(2023, 12, 15, 4, 52, 25, 958904)),
        ),
        migrations.AlterField(
            model_name='product_info_master',
            name='registration_time',
            field=models.TimeField(default=datetime.datetime(2023, 12, 15, 4, 52, 25, 959905)),
        ),
    ]