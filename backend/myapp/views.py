import uuid
import random
import decimal
from time import sleep
from django.http import JsonResponse
from django.db import connection
from .models import Person

def insert(request):
    for i in range(random.randint(10, 50)):
        sleep(decimal.Decimal(random.randrange(50, 300))/1000)

        p = Person(
            fname=uuid.uuid4().hex[:16], 
            lname=uuid.uuid4().hex[:16], 
            age=random.randint(10, 60))
        p.save()

    return JsonResponse({"result": "created!"})


def display(request, page, size):
    limit = size
    offset = page*size
    person = Person.objects.order_by("id")[offset:offset+limit]
    if person.exists():
        res = []
        for val in person.values("id", "fname", "lname", "age"):
            res.append({
                "id": val["id"],
                "fname": val["fname"],
                "lname": val["lname"],
                "age": val["age"]
            })

        return JsonResponse({"total": Person.objects.count(), "data": res}) 
    else:
        return JsonResponse({"total": Person.objects.count()})
