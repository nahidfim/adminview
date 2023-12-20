from django.shortcuts import render
import base64
from django.core.files.base import ContentFile
from core.models import order_transactions, operator_code_master, admin_code_master, product_info_master, product_category_master
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login as login_function
import json

# Create your views here.


def front(request):
    context = {}
    return render(request, "index.html", context)


def get_order_transactions(request, data_flag):
    if request.method == "GET":
        if data_flag == "all":
            data = order_transactions.objects.filter(
                product_code=1).filter(status="active").values()
            print(data)
        else:
            data = order_transactions.objects.filter(product_code=1).filter(provision_completion_flag=False).filter(
                order_cancellation_flag=False).filter(status="active").values()
        return JsonResponse(list(data), safe=False)


@csrf_exempt
def change_status(request, order_id):
    if request.method == "GET":
        row = order_transactions.objects.filter(
            order_no=order_id).update(provision_completion_flag=True, provider_operator_code=request.session.get('operator_code', ''))
        return HttpResponse("Order has been updated")


@csrf_exempt
def cancel_order(request, order_id):
    if request.method == "GET":
        row = order_transactions.objects.filter(
            order_no=order_id).update(order_cancellation_flag=True)
        return HttpResponse("Order has been updated")


@csrf_exempt
def login(request):
    if request.method == "POST":
        body = json.loads(request.body)
        operator_code = body['operator_code']
        operator_password = body['operator_password']
        check_user = operator_code_master.objects.filter(
            operator_password=operator_password).filter(
            operator_code=operator_code).first()
        if check_user:
            request.session['operator_code'] = check_user.operator_code
            return HttpResponse(True)
        else:
            return HttpResponse(False)


@csrf_exempt
def logout(request):
    if request.method == "GET":
        return HttpResponse("Order has been updated")


@csrf_exempt
def register(request):
    if request.method == "POST":
        body = json.loads(request.body)
        operator_name = body['operator_name']
        password = body['password']
        operator_code = body['operator_code']
        new_user = operator_code_master(
            operator_code=operator_code, operator_name=operator_name, operator_password=password, last_login="")
        new_user.save()
        return HttpResponse(True)


@csrf_exempt
def adminlogin(request):
    if request.method == "POST":
        body = json.loads(request.body)
        admin_code = body['admin_code']
        admin_password = body['admin_password']
        check_user = admin_code_master.objects.filter(
            admin_password=admin_password).filter(
            admin_code=admin_code).first()
        if check_user:
            request.session['admin_code'] = check_user.admin_code
            return HttpResponse(True)
        else:
            return HttpResponse(False)


@csrf_exempt
def adminlogout(request):
    if request.method == "GET":
        return HttpResponse("Order has been updated")


@csrf_exempt
def adminregister(request):
    if request.method == "POST":
        body = json.loads(request.body)
        admin_name = body['admin_name']
        password = body['password']
        admin_code = body['admin_code']
        new_user = admin_code_master(
            admin_code=admin_code, admin_name=admin_name, admin_password=password, last_login="")
        new_user.save()
        return HttpResponse(True)


@csrf_exempt
def add_product(request):
    if request.method == 'POST':
        product_id = request.POST['product_id']
        product_name = request.POST['product_name']
        product_price = request.POST['product_price']
        product_category = request.POST['product_category']
        image = request.POST['image']
        new_product = product_info_master(product_id=product_id, product_name_en=product_name,
                                          product_price_en=product_price, category_name=product_category, product_image_link_dest=image)
        new_product.save()
        return HttpResponse(True)


@csrf_exempt
def product_data(request):
    if request.method == 'GET':
        product_data = product_info_master.objects.values()
        return JsonResponse(list(product_data), safe=False)


@csrf_exempt
def get_admin(request):
    if request.method == 'GET':
        return HttpResponse(request.session.get('admin_code', ''))


@csrf_exempt
def get_category(request):
    if request.method == 'GET':
        return JsonResponse([i for i in product_category_master.objects.values_list('product_category')], safe=False)


@csrf_exempt
def add_category(request):
    if request.method == 'POST':
        product_category_no = request.POST['product_category_no']
        product_category = request.POST['product_category']
        product_category_name_en = request.POST['product_category_name_en']
        new_category = product_category_master(product_category_no=product_category_no, product_category=product_category,
                                               product_category_name_en=product_category_name_en)
        new_category.save()
        return HttpResponse(True)


@csrf_exempt
def get_product_category(request):
    if request.method == 'GET':
        product_data = product_category_master.objects.values()
        return JsonResponse(list(product_data), safe=False)
