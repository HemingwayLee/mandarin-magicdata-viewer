import os
import uuid
import random
import decimal
from time import sleep
from django.http import JsonResponse
from django.db import connection
from django.conf import settings
from .models import Files

folder_path = f'{settings.MEDIA_ROOT}/train/5_3039/'
def insert(request):
    for file in os.listdir(folder_path):
        if file.endswith(".wav"):
            # print(os.path.join(folder_path, file))
            obj, created = Files.objects.get_or_create(
                filename=file,
                text=''
            )

    return JsonResponse({"result": "created!"})


def display(request, page, size):
    limit = size
    offset = page*size
    files = Files.objects.order_by("id")[offset:offset+limit]
    if files.exists():
        res = []
        for val in files.values("id", "filename", "text", "created_at"):
            res.append({
                "id": val["id"],
                "filename": val["filename"],
                "text": val["text"],
                "created_at": val["created_at"]
            })

        return JsonResponse({"total": Files.objects.count(), "data": res}) 
    else:
        return JsonResponse({"total": 0, "data": []})
