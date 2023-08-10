from django.shortcuts import render
from core.models import order_transactions, operator_code_master
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django import db

# Create your views here.


def front(request):
    context = {}
    return render(request, "index.html", context)

def get_order_transactions(request, data_flag):
    if request.method == "GET":
        if data_flag == "all":
            data = order_transactions.objects.filter(product_code=1).filter(order_status="active").values()
            print(data)
        else:
            data = order_transactions.objects.filter(product_code=1).filter(provision_completion_flag=False).filter(order_cancellation_flag=False).filter(order_status="active").values()
        return JsonResponse(list(data), safe=False)
    
@csrf_exempt
def change_status(request, order_id):
    if request.method == "GET":
        row = order_transactions.objects.filter(order_no=order_id).update(provision_completion_flag=True)
        return HttpResponse("Order has been updated")
    
@csrf_exempt
def cancel_order(request, order_id):
    if request.method == "GET":
        row = order_transactions.objects.filter(order_no=order_id).update(order_cancellation_flag=True)
        return HttpResponse("Order has been updated")
    
    
@csrf_exempt
def login(request):
    if request.method == "POST":
        check_user = operator_code_master.objects.filter(operator_name=request.POST.get('username')).filter(operator_password=request.POST.get('password')).first()
        if check_user:
            return True
        else: False
        
    
    
@csrf_exempt
def logout(request):
    if request.method == "GET":
        return HttpResponse("Order has been updated")
    
    
@csrf_exempt
def register(request):
    if request.method == "POST":
        print(request.GET)
        username = request.POST.get('username')
        password = request.POST.get('password')
        print(username, password)
        new_user = operator_code_master(operator_name=username, operator_password=password)
        new_user.save()
        return HttpResponse("Order has been updated")
    


