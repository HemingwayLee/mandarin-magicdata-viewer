import os
import uuid
import json
import random
import decimal
import csv
from time import sleep
from django.http import JsonResponse
from django.db import connection
from django.views.decorators.http import require_http_methods
from django.conf import settings
from .models import Files

counter = {}
folder_path = f'{settings.MEDIA_ROOT}/train/5_3039/'
@require_http_methods(["GET"])
def init_csv2db(request):
    labels = {}
    with open(f'{settings.MEDIA_ROOT}/train/TRANS.txt', 'r', encoding='utf8') as csvfile:
        reader = csv.reader(csvfile, delimiter='\t')
        rows = list(reader)
        for row in rows:
            labels[row[0]] = row[2]

    for file in os.listdir(folder_path):
        if file.endswith(".wav"):
            wordings = labels[file] if file in labels else ''
            for char in wordings:
                if char in counter:
                    counter[char] += 1
                else:
                    counter[char] = 1
            
            obj, created = Files.objects.get_or_create(
                filename=file,
                text=wordings
            )

    print(counter)

    return JsonResponse({"result": "created!"})


@require_http_methods(["GET"])
def get_word_count_rank(request):
    out = []
    with open(f'{settings.MEDIA_ROOT}/hanziDB.csv', 'r', encoding='utf8') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        rows = list(reader)
        for row in rows:
            out.append({
                "rank": row[0],
                "char": row[1],
                "freq": counter[row[1]]
            })

    return JsonResponse({"result": out})


@require_http_methods(["GET"])
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


@require_http_methods(["POST"])
def update(request, id):
    print(id)
    body = json.loads(request.body)
    print(body["text"])

    Files.objects.filter(pk=id).update(text=body["text"])

    return JsonResponse({"result": "updated!"})


@require_http_methods(["GET"])
def save_labels(request):
    files = Files.objects.all()
    with open(f'{settings.MEDIA_ROOT}/train/TRANS.txt', 'w', encoding='utf8') as csvfile:
        datawriter = csv.writer(csvfile, delimiter='\t')
        for val in files.values("filename", "text"):
            datawriter.writerow([val["filename"], "5_3039", val["text"]])

    return JsonResponse({"result": "saved!"})
