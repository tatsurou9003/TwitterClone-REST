from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter 

app_name = "users"

router = DefaultRouter()
router.register("profile", views.ProfileViewSet)

urlpatterns = [
    path("register/", views.CreateUserView.as_view(), name="register"),
    path("myprofile/", views.MyProfileListView.as_view(), name="myprofile"),
    path("", include(router.urls))
]
