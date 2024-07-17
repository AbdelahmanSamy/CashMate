from django.contrib.auth.views import LoginView
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView
from .forms import CustomAuthenticationForm, CustomUserCreationForm
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from .models import Transaction, CustomUser
from .forms import TransactionForm
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.views.decorators.csrf import csrf_exempt
from django.contrib.messages.views import SuccessMessageMixin
from django.views import View
from django.contrib.auth import authenticate, login
import json

@csrf_exempt
def custom_login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')
            user = authenticate(request, username=email, password=password)

            if user is not None:
                # Authentication successful
                login(request, user)
                return JsonResponse({'message': 'Login successful'})
            else:
                # Authentication failed
                return JsonResponse({'error': 'Invalid credentials'}, status=401)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)   

def initiate_transaction(request):
    if request.method == 'POST':
        form = TransactionForm(request.POST)
        if form.is_valid():
            transaction = form.save(commit=False)
            transaction.sender = request.user
            transaction.save()
            return redirect('transaction_history')
    else:
        form = TransactionForm()
    return render(request, 'initiate_transaction.html', {'form': form})

def transaction_history(request):
    transactions = Transaction.objects.filter(sender=request.user).order_by('-timestamp')
    return render(request, 'transaction_history.html', {'transactions': transactions})

    
@csrf_exempt
def custom_signup_view(request):
    if request.method == 'POST':
        try:
            # Parse the JSON data from the request body
            data = json.loads(request.body)

            firstname = data.get('firstname')
            lastname = data.get('lastname')
            email = data.get('email')
            password = data.get('password')

            # Create a new user instance
            CustomUser.objects.create(email=email, first_name=firstname, last_name=lastname, password=password)
            

            return JsonResponse({'message': 'User created successfully'}, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
