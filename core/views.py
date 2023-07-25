from django.shortcuts import render
from core.models import order_transactions
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def front(request):
    context = {}
    return render(request, "index.html", context)

def get_order_transactions(request, data_flag):
    if request.method == "GET":
        if data_flag == "all":
            data = list(order_transactions.objects.filter(product_code=1).values())
        else:
            data = list(order_transactions.objects.filter(product_code=1).filter(provision_completion_flag=False).values())
        return HttpResponse(data)
    
@csrf_exempt
def change_status(request, order_id):
    if request.method == "GET":
        row = order_transactions.objects.filter(order_no=order_id).update(provision_completion_flag=True)
        return HttpResponse("Order has been updated")
    


