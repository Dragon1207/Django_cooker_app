from rest_framework.test import APITestCase
from django.urls import reverse
from faker import Faker
from .models import User
from rest_framework import status
from rest_framework.test import RequestsClient


class TestSetUp(APITestCase):

    def setUp(self):
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.list_user_url = reverse('list-users')
        # self.detail_user_url = reverse('detail-user', id=1)
        self.refresh_token_url = reverse('token_refresh')
        self.fake = Faker()

        self.user_data = {
            'email': self.fake.email(),
            'username': self.fake.email(),
            'password': self.fake.password(),
        }

        return super().setUp()

    def tearDown(self):
        return super().tearDown()



class UserTests(TestSetUp):

    def test_get_user_list(self):
        res = self.client.get(self.list_user_url)
        self.assertEqual(res.status_code, 200)

    # def test_get_user_detail(self):
    #     response = self.client.get(self.detail_user_url)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_update_user_detail(self):
    #     self.user_data.email = test@test.com



class TestViews(TestSetUp):
    def test_user_cannot_register_with_no_data(self):
        res = self.client.post(self.register_url)
        self.assertEqual(res.status_code, 400)

    def test_user_can_register_correctly(self):
        res = self.client.post(
            self.register_url, self.user_data, format="json")
        # self.assertEqual(res.data['email'], self.user_data['email'])
        self.assertEqual(res.status_code, 201)

    def test_user_can_login_after_register(self):
        register = self.client.post(
            self.register_url, self.user_data, format="json")
        res = self.client.post(self.login_url, self.user_data, format="json")
        import pdb; pdb.set_trace()
        self.assertEqual(res.status_code, 200)

    def test_user_can_get_token(self):
        token_obtain_response = self.client.post(token_obtain_pair, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
