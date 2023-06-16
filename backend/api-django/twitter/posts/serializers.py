from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.model_meta):
    created_on = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = Post
        fields = ("id", "title", "userPost", "created_on", "img", "liked")
        extra_kwargs = {"userPost": {"read_only": True}}
