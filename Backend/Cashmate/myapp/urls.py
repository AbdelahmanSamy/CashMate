from django.urls import path
from . import views

urlpatterns = [
    
    path('login/', views.custom_login_view, name='login'),
    path('signup/', views.custom_signup_view, name='signup'),

    path('initiate-transaction/', views.initiate_transaction, name='initiate_transaction'),
    path('transaction-history/', views.transaction_history, name='transaction_history'),
]   
