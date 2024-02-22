# Generated by Django 4.1.1 on 2024-02-22 04:49

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_alter_admin_code_master_registration_time_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='admin_code_master',
            name='registration_time',
            field=models.TimeField(default=datetime.datetime(2024, 2, 22, 4, 49, 28, 805956)),
        ),
        migrations.AlterField(
            model_name='company_master',
            name='registration_time',
            field=models.TimeField(default=datetime.datetime(2024, 2, 22, 4, 49, 28, 804868)),
        ),
        migrations.AlterField(
            model_name='operator_code_master',
            name='registration_time',
            field=models.TimeField(default=datetime.datetime(2024, 2, 22, 4, 49, 28, 805801)),
        ),
        migrations.AlterField(
            model_name='order_transactions',
            name='delivery_completion_time',
            field=models.TimeField(default=datetime.datetime(2024, 2, 22, 4, 49, 28, 804229)),
        ),
        migrations.AlterField(
            model_name='order_transactions',
            name='order_cancellation_time',
            field=models.TimeField(default=datetime.datetime(2024, 2, 22, 4, 49, 28, 804236)),
        ),
        migrations.AlterField(
            model_name='order_transactions',
            name='order_time',
            field=models.DateTimeField(default=datetime.datetime(2024, 2, 22, 4, 49, 28, 804098)),
        ),
        migrations.AlterField(
            model_name='ordertransactionitempdf',
            name='transaction_time',
            field=models.DateTimeField(default=datetime.datetime(2024, 2, 22, 4, 49, 28, 804527)),
        ),
        migrations.AlterField(
            model_name='ordertransactionpdf',
            name='transaction_time',
            field=models.DateTimeField(default=datetime.datetime(2024, 2, 22, 4, 49, 28, 804413)),
        ),
        migrations.AlterField(
            model_name='page_master',
            name='registration_time',
            field=models.TimeField(default=datetime.datetime(2024, 2, 22, 4, 49, 28, 805142)),
        ),
        migrations.AlterField(
            model_name='product_category_master',
            name='registration_time',
            field=models.TimeField(default=datetime.datetime(2024, 2, 22, 4, 49, 28, 804986)),
        ),
        migrations.AlterField(
            model_name='product_info_master',
            name='registration_time',
            field=models.TimeField(default=datetime.datetime(2024, 2, 22, 4, 49, 28, 805491)),
        ),
    ]
