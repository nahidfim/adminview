from django.shortcuts import render
from core.models import order_transactions, operator_code_master, product_info_master, product_category_master
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login as login_function
import json

# Create your views here.


def front(request):
    context = {}
    return render(request, "index.html", context)

@login_required
def get_order_transactions(request, data_flag):
    if request.method == "GET":
        if data_flag == "all":
            data = order_transactions.objects.filter(product_code=1).filter(order_status="active").values()
            print(data)
        else:
            data = order_transactions.objects.filter(product_code=1).filter(provision_completion_flag=False).filter(order_cancellation_flag=False).filter(order_status="active").values()
        return JsonResponse(list(data), safe=False)
    
@csrf_exempt
@login_required
def change_status(request, order_id):
    if request.method == "GET":
        row = order_transactions.objects.filter(order_no=order_id).update(provision_completion_flag=True)
        return HttpResponse("Order has been updated")
    
@csrf_exempt
@login_required
def cancel_order(request, order_id):
    if request.method == "GET":
        row = order_transactions.objects.filter(order_no=order_id).update(order_cancellation_flag=True)
        return HttpResponse("Order has been updated")
    
    
@csrf_exempt
def login(request):
    if request.method == "POST":
        body = json.loads(request.body)
        username = body['username']
        password = body['password']
        check_user = operator_code_master.objects.filter(operator_name=username).filter(operator_password=password).first()
        if check_user:
            request.session['code'] = check_user.operator_code
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
        username = body['username']
        password = body['password']
        operator_code = body['operator_code']
        new_user = operator_code_master(operator_code=operator_code, operator_name=username, operator_password=password, last_login="")
        new_user.save()
        return HttpResponse(True)
    
@csrf_exempt
def add_product(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        product_id = body['product_id']
        product_name = body['product_name']
        product_price = body['product_price']
        product_category = body['product_category']
        image_link = body['image_link']
        new_product = product_info_master(product_id=product_id, product_name_en=product_name, product_price_en=product_price, category_name=product_category, product_image_link_dest=image_link)
        new_product.save()
        return HttpResponse(True)

@csrf_exempt 
def product_data(request):
    if request.method == 'GET':
        product_data = product_info_master.objects.values()
        return JsonResponse(list(product_data), safe=False)
    
@csrf_exempt
def get_operator(request):
    if request.method == 'GET':
        return HttpResponse(request.session.get('code', ''))
    
@csrf_exempt
def get_category(request):
    if request.method == 'GET':
        return JsonResponse([i for i in product_category_master.objects.values_list('product_category')], safe=False)

