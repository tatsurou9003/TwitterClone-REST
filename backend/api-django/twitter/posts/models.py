from django.db import models
from django.conf import settings

# アップロード画像の保存場所を管理
def upload_post_path(instance, filename):
    ext = filename.split(".")[-1]
    return "/".join(["posts", str(instance.userPost.id)+str(instance.title)+str(".")+str(ext)])

class Post(models.Model):
    title = models.CharField(max_length=140)
    userPost = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="userPost",
        on_delete=models.CASCADE
    )
    created_on = models.DateTimeField(auto_now_add=True)
    img = models.ImageField(blank=True, null=True, upload_to=upload_post_path)
    liked = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="liked", blank=True)

    def __str__(self):
        return self.title