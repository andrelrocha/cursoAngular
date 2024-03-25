import { Component } from '@angular/core';

@Component({
  selector: 'app-app-footer',
  standalone: true,
  imports: [],
  templateUrl: './app-footer.component.html',
  styleUrl: './app-footer.component.css'
})
export class AppFooterComponent {

  validateForm(event: Event) {
    var loginInput = document.getElementById('userLogin') as HTMLInputElement;
    var passwordInput = document.getElementById('userPassword') as HTMLInputElement;
    var emailRegex = /^[A-Za-z0-9+_.-]+@(.+)$/;
    var passwordRegex = /^(?=.*[A-Z])(?=.*\d).*$/;

    if (!emailRegex.test(loginInput.value)) {
        loginInput.classList.add('is-invalid');
        event.preventDefault();
    } else {
        loginInput.classList.remove('is-invalid');
    }

    if (passwordInput.value.length < 8 || !passwordRegex.test(passwordInput.value)) {
        passwordInput.classList.add('is-invalid');
        event.preventDefault();
    } else {
        passwordInput.classList.remove('is-invalid');
    }
  }
}
