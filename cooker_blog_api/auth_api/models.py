
from django.contrib.auth.models import User
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from rest_framework_simplejwt.tokens import RefreshToken


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.user.id, filename)


class UserManager(BaseUserManager):

    def create_user(self, email, username, password, **other_fields):

        if email is None:
            raise TypeError('Users should have a email')

        if username is None:
            raise TypeError('Users should have a username')

        user = self.model(email=self.normalize_email(
            email), username=username, **other_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, username, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        if password is None:
            raise TypeError('Password should not be none')

        user = self.create_user(email, username, password, **other_fields)
        user.is_verified = True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):

    # class adminObjects(models.Manager):
    #     def get_queryset(self):
    #         return super().get_queryset().filter(is_superuser=True)

    username = models.CharField(max_length=255, unique=True, db_index=True)
    email = models.EmailField(max_length=225, unique=True, db_index=True)
    first_name = models.CharField(max_length=25, blank=True)
    last_name = models.CharField(max_length=25, blank=True)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to=user_directory_path, default='image/default.jpg', blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = UserManager()
    # adminobjects = adminObjects()

    def __str__(self):
        return self.email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }