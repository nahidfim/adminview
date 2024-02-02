from django.shortcuts import render
import base64
from django.core.files.base import ContentFile
from core.models import (
    order_transactions, operator_code_master,
    admin_code_master, product_info_master,
    product_category_master, OrderTransactionPDF, OrderTransactionItemPDF
)
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login as login_function
from django.template.loader import render_to_string

from datetime import datetime, time

import json
import pytz

from weasyprint import HTML, CSS

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


@csrf_exempt
def generate_pdf(request):
    order_transactions_list = []
    order_transaction_map = {}
    total_order = 0
    total_amount = 0
    today_date = datetime.utcnow()
    from_date = datetime.combine(today_date.date(),
                                 time(0, 0, 0, tzinfo=pytz.timezone('UTC')))
    to_date = datetime.combine(today_date.date(),
                               time(23, 59, 59, tzinfo=pytz.timezone('UTC')))
    order_transactions_qs = order_transactions.objects.filter(
        order_time__range=[from_date, to_date])
    for order_transaction in order_transactions_qs:
        if order_transaction_map.get(order_transaction.table_no):
            order_value = order_transaction_map[order_transaction.table_no]['total_order']
            order_value += 1
            order_transaction_map[order_transaction.table_no]['total_order'] = order_value
            amount_value = order_transaction_map[order_transaction.table_no]['total_amount']
            amount_value += order_transaction.product_unit_price
            order_transaction_map[order_transaction.table_no]['total_amount'] = amount_value
        else:
            order_value = 1
            amount_value = order_transaction.product_unit_price
            order_transaction_map[order_transaction.table_no] = {
                "total_order": order_value,
                "total_amount": amount_value,
                "lane_no": order_transaction.lane_no
            }

    for key, value in order_transaction_map.items():
        total_order += order_transaction_map[key]['total_order']
        total_amount += order_transaction_map[key]['total_amount']
        value["table_no"] = key
        order_transactions_list.append(value)

    from_date = from_date.strftime('%Y-%m-%d %H:%M')
    to_date = to_date.strftime('%Y-%m-%d %H:%M')
    data = {
        "order_transactions": order_transactions_list,
        "total_amount": total_amount,
        "total_order": total_order,
        "from_date": from_date,
        "to_date": to_date
    }
    filename = f"order_transaction_{int(today_date.timestamp())}.pdf"
    file_path = f"media/{filename}"
    html_string = render_to_string('order_transaction_pdf.html', data)
    css = CSS(string='@page { size: A4; margin: 0.15in;  }')
    HTML(string=html_string).write_pdf(file_path, stylesheets=[css])
    order_transaction_obj = OrderTransactionPDF.objects.create(
        transaction_time=today_date, pdf_file=filename)
    return JsonResponse({'pdf_url': order_transaction_obj.pdf_file.url}, safe=False)


@csrf_exempt
def generate_pdf_item(request):
    order_transactions_list = []
    order_transaction_map = {}
    total_order = 0
    total_amount = 0
    today_date = datetime.utcnow()
    from_date = datetime.combine(today_date.date(),
                                 time(0, 0, 0, tzinfo=pytz.timezone('UTC')))
    to_date = datetime.combine(today_date.date(),
                               time(23, 59, 59, tzinfo=pytz.timezone('UTC')))
    order_transactions_qs = order_transactions.objects.filter(
        order_time__range=[from_date, to_date])
    for order_transaction in order_transactions_qs:
        if order_transaction_map.get(order_transaction.product_name_en):
            order_value = order_transaction_map[order_transaction.product_name_en]['total_order']
            order_value += 1
            order_transaction_map[order_transaction.product_name_en]['total_order'] = order_value
            amount_value = order_transaction_map[order_transaction.product_name_en]['total_amount']
            amount_value += order_transaction.product_unit_price
            order_transaction_map[order_transaction.product_name_en]['total_amount'] = amount_value
        else:
            order_value = 1
            amount_value = order_transaction.product_unit_price
            order_transaction_map[order_transaction.product_name_en] = {
                "total_order": order_value,
                "total_amount": amount_value,
                "product_code": order_transaction.product_code
            }

    for key, value in order_transaction_map.items():
        total_order += order_transaction_map[key]['total_order']
        total_amount += order_transaction_map[key]['total_amount']
        value["product_name_en"] = key
        order_transactions_list.append(value)

    from_date = from_date.strftime('%Y-%m-%d %H:%M')
    to_date = to_date.strftime('%Y-%m-%d %H:%M')
    data = {
        "order_transactions": order_transactions_list,
        "total_amount": total_amount,
        "total_order": total_order,
        "from_date": from_date,
        "to_date": to_date
    }
    filename = f"order_transaction_Item_{int(today_date.timestamp())}.pdf"
    file_path = f"media/{filename}"
    html_string = render_to_string('order_transaction_Item_pdf.html', data)
    css = CSS(string='@page { size: A4; margin: 0.15in;  }')
    HTML(string=html_string).write_pdf(file_path, stylesheets=[css])
    order_transaction_obj = OrderTransactionItemPDF.objects.create(
        transaction_time=today_date, pdf_file=filename)
    return JsonResponse({'pdf_url': order_transaction_obj.pdf_file.url}, safe=False)


@csrf_exempt
def search_pdf(request):
    if request.method == "GET":
        from_date = request.GET.get('from_date')
        to_date = request.GET.get('to_date')

        pdf_url_list = []
        from_date = datetime.strptime(from_date, '%Y-%m-%d')
        to_date = datetime.strptime(to_date, '%Y-%m-%d')
        from_date = datetime.combine(from_date.date(),
                                     time(0, 0, 0, tzinfo=pytz.timezone('UTC')))
        to_date = datetime.combine(to_date.date(),
                                   time(23, 59, 59, tzinfo=pytz.timezone('UTC')))
        order_transaction_pdfs = OrderTransactionPDF.objects.filter(
            transaction_time__range=[from_date, to_date]
        ).order_by('-transaction_time')
        for pdf in order_transaction_pdfs:
            pdf_url_list.append({
                'pdf_url': pdf.pdf_file.url,
                'transaction_time': pdf.transaction_time
            })
        return JsonResponse({'pdf_url_list': pdf_url_list}, safe=False)


@csrf_exempt
def search_item_pdf(request):
    if request.method == "GET":
        from_date = request.GET.get('from_date')
        to_date = request.GET.get('to_date')

        pdf_url_list = []
        from_date = datetime.strptime(from_date, '%Y-%m-%d')
        to_date = datetime.strptime(to_date, '%Y-%m-%d')
        from_date = datetime.combine(from_date.date(),
                                     time(0, 0, 0, tzinfo=pytz.timezone('UTC')))
        to_date = datetime.combine(to_date.date(),
                                   time(23, 59, 59, tzinfo=pytz.timezone('UTC')))
        order_transaction_pdfs = OrderTransactionItemPDF.objects.filter(
            transaction_time__range=[from_date, to_date]
        ).order_by('-transaction_time')
        for pdf in order_transaction_pdfs:
            pdf_url_list.append({
                'pdf_url': pdf.pdf_file.url,
                'transaction_time': pdf.transaction_time
            })
        return JsonResponse({'pdf_url_list': pdf_url_list}, safe=False)
