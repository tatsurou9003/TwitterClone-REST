from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter 

app_name = "posts"

router = DefaultRouter()
router.register("post",views.PostViewSet)

urlpatterns = [
    path("", include(router.urls))
]