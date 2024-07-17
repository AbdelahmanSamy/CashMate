from django import forms
from django.contrib.auth.forms import AuthenticationForm
from .models import CustomUser
from django.contrib.auth.models import User
from .models import Transaction

class CustomAuthenticationForm(AuthenticationForm):
    class Meta:
        model = CustomUser
        fields = ['email', 'password']

class CustomUserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = CustomUser
        fields = ('email', 'first_name', 'last_name')

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user
    
class TransactionForm(forms.ModelForm):
    receiver = forms.ModelChoiceField(
        queryset=User.objects.all(),  # Use the appropriate User queryset
        label='Receiver',
        widget=forms.Select(attrs={'class': 'form-control'}),
    )
    amount = forms.DecimalField(
        max_digits=10,
        decimal_places=2,
        label='Amount',
        widget=forms.NumberInput(attrs={'class': 'form-control'}),
    )

    class Meta:
        model = Transaction
        fields = ['receiver', 'amount']