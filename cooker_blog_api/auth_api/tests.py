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
        self.detail_user_url = reverse('detail-user', kwargs={'id': 1})
        self.refresh_token_url = reverse('token_refresh')
        self.fake = Faker()

        self.user1_data = {
            'email': self.fake.email(),
            'username': self.fake.name(),
            'password': self.fake.password(),
        }
        self.user2_data = {
            'email': self.fake.email(),
            'username': self.fake.name(),
            'password': self.fake.password(),
        }
        self.admin_user_data = {
            'email': self.fake.email(),
            'username': self.fake.name(),
            'password': self.fake.password(),
        }

        return super().setUp()

    def tearDown(self):
        return super().tearDown()



class TestUserViews(TestSetUp):

    def test_get_user_list(self):
        my_admin = User.objects.create_superuser(username=self.admin_user_data['username'], email=self.admin_user_data['email'], password=self.admin_user_data['password'])
        login_res = self.client.post(self.login_url, {
            'email': self.admin_user_data['email'],
            'password': self.admin_user_data['password'],
            })
        token = login_res.data['tokens']['access']
        res = self.client.get(self.list_user_url, HTTP_AUTHORIZATION='Bearer {0}'.format(token))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_user_can_not_user_list_if_not_admin(self):
        my_user = User.objects.create_user(username=self.user1_data['username'], email=self.user1_data['email'], password=self.user1_data['password'])
        login_res = self.client.post(self.login_url, {
            'email': self.user1_data['email'],
            'password': self.user1_data['password'],
            })
        token = login_res.data['tokens']['access']
        res = self.client.get(self.list_user_url, HTTP_AUTHORIZATION='Bearer {0}'.format(token))
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)


    def test_get_user_detail(self):
        register1_res = self.client.post(self.register_url, self.user1_data)
        login_res = self.client.post(self.login_url, self.user1_data)
        token = login_res.data['tokens']['access']
        res = self.client.get(self.detail_user_url, HTTP_AUTHORIZATION='Bearer {0}'.format(token))
        # import pdb; pdb.set_trace()
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_get_user_can_not_get_detail_of_other_user(self):
        register1_res = self.client.post(self.register_url, self.user1_data)
        register2_res = self.client.post(self.register_url, self.user2_data)
        login_res = self.client.post(self.login_url, self.user2_data)
        token = login_res.data['tokens']['access']
        import pdb; pdb.set_trace()
        res = self.client.get(self.detail_user_url, HTTP_AUTHORIZATION='Bearer {0}'.format(token))
        self.assertEqual(res.status_code, status.HTTP_200_OK)


    # def test_update_user(self):
    #     register_res = self.client.post(self.register_url, self.user1_data)
    #     login_res = self.client.post(self.login_url, self.user1_data)
    #     create_user_response = self.client.post(self.list_user_url, {'email': self.user1_data['email'],'username': self.user1_data['username']})
    #     res = self.client.put(self.detail_user_url,  {'email': self.user1_data['email'],'username': self.fake.name()})
    #     self.assertNotEqual(res.data['username'], self.user1_data['username'])
    #     self.assertEqual(res.status_code, status.HTTP_200_OK)


    # def test_delete_user(self):
    #     create_user_response = self.client.post(self.list_user_url, {'email': self.user1_data['email'],'username': self.user1_data['username']})
    #     res = self.client.delete(self.detail_user_url)
    #     self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)




class TestAuthViews(TestSetUp):
    def test_user_cannot_register_with_no_data(self):
        res = self.client.post(self.register_url)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_can_register_correctly(self):
        res = self.client.post(self.register_url, self.user1_data)
        self.assertEqual(res.data['email'], self.user1_data['email'])
        self.assertEqual(res.data['username'], self.user1_data['username'])
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_user_can_login_after_register(self):
        register = self.client.post(self.register_url, self.user1_data)
        res = self.client.post(self.login_url, self.user1_data)
        self.assertEqual(res.data['email'], self.user1_data['email'])
        self.assertIsNotNone(res.data['tokens']['access'])
        self.assertIsNotNone(res.data['tokens']['refresh'])
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_user_can_refresh_token(self):
        register_res = self.client.post(self.register_url, self.user1_data)
        login_res = self.client.post(self.login_url, self.user1_data)
        self.assertIsNotNone(login_res.data['tokens']['access'])
        self.assertIsNotNone(login_res.data['tokens']['refresh'])
        self.assertEqual(login_res.status_code, status.HTTP_200_OK)
        refresh_token_res = self.client.post(self.refresh_token_url, {'refresh':login_res.data['tokens']['refresh']})
        self.assertIsNotNone(refresh_token_res.data['access'])
        self.assertEqual(refresh_token_res.status_code, status.HTTP_200_OK)
