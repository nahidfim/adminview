# Generated by Django 4.2 on 2023-08-21 17:44

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0002_alter_company_master_registration_time_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="product_info_master",
            name="image",
            field=models.ImageField(default=None, upload_to=""),
        ),
        migrations.AlterField(
            model_name="company_master",
            name="registration_time",
            field=models.TimeField(
                default=datetime.datetime(2023, 8, 21, 17, 44, 58, 812159)
            ),
        ),
        migrations.AlterField(
            model_name="operator_code_master",
            name="registration_time",
            field=models.TimeField(
                default=datetime.datetime(2023, 8, 21, 17, 44, 58, 815059)
            ),
        ),
        migrations.AlterField(
            model_name="order_transactions",
            name="delivery_completion_time",
            field=models.TimeField(
                default=datetime.datetime(2023, 8, 21, 17, 44, 58, 811742)
            ),
        ),
        migrations.AlterField(
            model_name="order_transactions",
            name="order_cancellation_time",
            field=models.TimeField(
                default=datetime.datetime(2023, 8, 21, 17, 44, 58, 811754)
            ),
        ),
        migrations.AlterField(
            model_name="order_transactions",
            name="order_time",
            field=models.TimeField(
                default=datetime.datetime(2023, 8, 21, 17, 44, 58, 811714)
            ),
        ),
        migrations.AlterField(
            model_name="page_master",
            name="registration_time",
            field=models.TimeField(
                default=datetime.datetime(2023, 8, 21, 17, 44, 58, 813057)
            ),
        ),
        migrations.AlterField(
            model_name="product_category_master",
            name="registration_time",
            field=models.TimeField(
                default=datetime.datetime(2023, 8, 21, 17, 44, 58, 812599)
            ),
        ),
        migrations.AlterField(
            model_name="product_info_master",
            name="registration_time",
            field=models.TimeField(
                default=datetime.datetime(2023, 8, 21, 17, 44, 58, 814124)
            ),
        ),
    ]
