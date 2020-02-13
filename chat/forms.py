from django import forms
from django.contrib.auth.forms import UsernameField, AuthenticationForm as af


class AuthenticationForm(af):
    def __init__(self, request=None, *args, **kwargs):
        super().__init__(request=None, *args, **kwargs)
        self.fields['username'].widget.attrs['placeholder'] = 'xxxxx'

    # username = UsernameField(widget=forms.TextInput(attrs={'autofocus': True}))
    # password = forms.CharField(
    #     label=("Password"),
    #     strip=False,
    #     widget=forms.PasswordInput(attrs={'autocomplete': 'current-password'}),
    # )
    # error_messages = {
    #     'invalid_login': (
    #         "Please enter a correct %(username)s and password. Note that both "
    #         "fields may be case-sensitive."
    #     ),
    #     'inactive': ("This account is inactive."),
    # }
