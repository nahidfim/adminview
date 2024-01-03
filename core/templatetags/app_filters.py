from django import template

register = template.Library()


@register.filter
def format_number(number):
    if number:
        return "{:,}".format(number)
    elif number == 0:
        return 0
    else:
        return "-"
