from django.db import models
from auth_api.models import User
# user_directory_path
from django.utils import timezone
# Create your models here.


# def user_directory_path(instance, filename):
#     # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
#     return 'image_{0}/{1}'.format(instance.id, filename)

class Ingredient(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


# class Image(models.Model):
#     image = models.ImageField(upload_to=user_directory_path)


class Post(models.Model):

    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    OPTIONS = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    ingredient = models.ManyToManyField(Ingredient, blank=True)
    # images = models.ForeignKey(Image, on_delete=models.SET_NULL, blank=True, null=True)
    title = models.CharField(max_length=250)
    content = models.TextField()
    slug = models.SlugField(max_length=250, unique_for_date='published')
    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='post_author')
    status = models.CharField(
        max_length=10, choices=OPTIONS, default='published')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = models.Manager()  # default manager
    postobjects = PostObjects()  # custom manager

    class Meta:
        ordering = ('-published',)

    def __str__(self):
        return self.title