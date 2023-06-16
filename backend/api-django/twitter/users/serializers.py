from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Profile, Follow

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ("id", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user
    
class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ("follower", "following")

class ProfileSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)
    followings = FollowSerializer(source="followings", many=True, read_only=True)
    followers = FollowSerializer(source="followers", many=True, read_only=True)
    followings_count = serializers.SerializerMethodField()
    followers_count = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ("id", "userName", "userProfile", "created_on", "img", "followings", "followers", "followings_count", "followers_count")
        extra_kwargs = {"userProfile": {"read_only": True}}

    def get_followings_count(self, obj):
        return obj.followings.count()

    def get_followers_count(self, obj):
        return obj.followers.count()

