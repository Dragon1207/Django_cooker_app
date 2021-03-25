from rest_framework.test import APITestCase
from django.urls import reverse
from faker import Faker
from .models import Post
from auth_api.models import User
from rest_framework import status
from rest_framework.test import RequestsClient


class TestSetUp(APITestCase):

    def setUp(self):
        self.list_user_url = reverse('list-users')
        self.list_post_url = reverse('list-posts')
        self.detail_post_url = reverse('detail-post', kwargs={'id': 1})
        self.fake = Faker()

        self.user_data = {
            'email': self.fake.email(),
            'username': self.fake.name(),
        }

        self.post_data = {
            "title": "my first post title",
            "content": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            "published": "2021-03-25T07:50:01.688Z",
            "status": "draft",
            "ingredient": [
                {
                "name": "string"
                },
            ],
            "author": 1
        }

        return super().setUp()

    def tearDown(self):
        return super().tearDown()



class TestPostViews(TestSetUp):

    def test_get_post_list(self):
        res = self.client.get(self.list_post_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)


    def test_create_post(self):
        create_user_response = self.client.post(self.list_user_url, {'email': self.user_data['email'],'username': self.user_data['username']}, format="json")
        res = self.client.post(self.list_post_url, self.post_data, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)


    def test_get_post_detail(self):
        create_user_response = self.client.post(self.list_user_url, {'email': self.user_data['email'],'username': self.user_data['username']}, format="json")
        create_post_response = self.client.post(self.list_post_url, self.post_data, format="json")
        res = self.client.get(self.detail_post_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)


    def test_update_post(self):
        create_user_response = self.client.post(self.list_user_url, {'email': self.user_data['email'],'username': self.user_data['username']}, format="json")
        create_post_response = self.client.post(self.list_post_url, self.post_data, format="json")
        res = self.client.put(self.detail_post_url,  {
            'title': self.post_data['title'],
            'content': self.fake.name(),
            "published": "2021-03-25T07:50:01.688Z",
            "status": "draft",
            "ingredient": [
                {
                "name": "string"
                },
            ],
            "author": 1
            }, format="json")
        self.assertNotEqual(res.data['content'], self.post_data['content'])
        self.assertEqual(res.status_code, status.HTTP_200_OK)


    def test_delete_post(self):
        create_user_response = self.client.post(self.list_user_url, {'email': self.user_data['email'],'username': self.user_data['username']}, format="json")
        create_post_response = self.client.post(self.list_post_url, self.post_data, format="json")
        res = self.client.delete(self.detail_post_url)
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)