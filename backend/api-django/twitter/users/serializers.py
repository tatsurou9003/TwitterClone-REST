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
    followings = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    followings_count = serializers.SerializerMethodField()
    followers_count = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ("id", "userName", "userProfile", "created_on", "img", "followings", "followers", "followings_count", "followers_count")
        extra_kwargs = {"userProfile": {"read_only": True}}

    def get_followings(self, obj):
        # Userに紐づくFollowインスタンスを取得
        user = obj.userProfile
        followings = Follow.objects.filter(follower=user)
        # FollowSerializerを使用してシリアライズ
        return FollowSerializer(followings, many=True).data

    def get_followers(self, obj):
        # Userに紐づくFollowインスタンスを取得
        user = obj.userProfile
        followers = Follow.objects.filter(following=user)
        # FollowSerializerを使用してシリアライズ
        return FollowSerializer(followers, many=True).data

    def get_followings_count(self, obj):
        # followingsのカウント
        user = obj.userProfile
        return Follow.objects.filter(follower=user).count()

    def get_followers_count(self, obj):
        # followersのカウント
        user = obj.userProfile
        return Follow.objects.filter(following=user).count()

