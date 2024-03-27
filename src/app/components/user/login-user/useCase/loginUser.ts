import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormUtils } from '../../../../utils/formUtils';
import { AuthService } from '../../../../service/authService';

@Injectable()
export class LoginUser {
  constructor(private http: HttpClient, private authService: AuthService) {}

  performLogin(loginForm: FormGroup): void {
    if (loginForm.valid) {
        const header = new HttpHeaders({
          contentType: 'application/json',
        });

        const userData = {
          login: loginForm.value.login,
          password: loginForm.value.senha,
        };

        this.http.post('http://localhost:8000/login', userData, { headers: header })
        .subscribe({
          next: (response: any) => {
            loginForm.reset();
            this.authService.setAuthToken(response.token);
            //window.location.href = 'http://localhost:4200/login';
          },
          error: (error: any) => {
            if (error.status === 400 && error.error instanceof Array) {
                let errorMessage = error.error.map((errorObj: any) => `${errorObj.field} ${errorObj.message}`).join('\n');
                alert(`Erro ${error.status}: \n${errorMessage}`);
            } else {
                alert('Erro ao logar usuário. Por favor, tente novamente.');
            }
          }
        });

    } else {
      console.log('Formulário inválido!');
      FormUtils.logValidationErrors(loginForm);
    }
  }
}
