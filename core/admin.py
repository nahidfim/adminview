from django.contrib import admin
from core.models import order_transactions, OrderTransactionPDF

# Register your models here.
admin.site.register(order_transactions)
admin.site.register(OrderTransactionPDF)
