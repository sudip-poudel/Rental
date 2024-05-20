from django.shortcuts import render
from django.http import HttpResponse
from .models import Testing
from rest_framework import serializers
# Create your views here.
def main(request) :
    a=Testing.objects.all()
    
    print(a[0].name)
    return HttpResponse("hello world!")
def insert(request):
    a =Testing(name="name")
    a.save()
    return HttpResponse(True)


class TestingSerializer(serializers.ModelSerializer):
    class Meta:
        model=Testing
        fields=("__all__")