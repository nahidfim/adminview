"""
URL configuration for kitchen_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from core.views import front, get_order_transactions, change_status, cancel_order, login, logout, register, add_product, product_data, get_operator, get_category, add_category, get_product_category

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", front, name="front"),
    path("get_order_transactions/<str:data_flag>", get_order_transactions),
    path("change_status/<str:order_id>", change_status),
    path("cancel_order/<str:order_id>", cancel_order),
    path("add_product", add_product),
    path("get_product_data", product_data),
    path("login", login),
    path("logout", logout),
    path("register/", register),
    path('get_operator/', get_operator),
    path('get_category', get_category),
    path('add_category', add_category),
    path('get_product_category', get_product_category)
]
