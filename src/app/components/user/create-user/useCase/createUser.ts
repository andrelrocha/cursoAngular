import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormUtils } from '../../../../utils/formUtils';

@Injectable()
export class CreateUser {
  constructor(private http: HttpClient) {}

  onSubmit(userForm: FormGroup): void {
    if (userForm.valid) {
        const header = new HttpHeaders({
          contentType: 'application/json',
        });

        const userData = {
          login: userForm.value.login,
          password: userForm.value.senha,
          name: userForm.value.nome,
          cpf: userForm.value.cpf
        };

        this.http.post('http://localhost:8000/login/create', userData, { headers: header })
        .subscribe({
          next: (response: any) => {
            console.log('Usuário criado com sucesso!', response);
            alert(`Bem-vindo ${response.name}`);
            userForm.reset();
            //window.location.href = 'http://localhost:4200/login';
          },
          error: (error: any) => {
            if (error.status === 400 && error.error instanceof Array) {
                let errorMessage = error.error.map((errorObj: any) => `${errorObj.field} ${errorObj.message}`).join('\n');
                alert(`Erro ${error.status}: \n${errorMessage}`);
            } else {
                alert('Erro ao criar usuário. Por favor, tente novamente.');
            }
          }
        });

    } else {
      console.log('Formulário inválido!');
      FormUtils.logValidationErrors(userForm);
    }
  }
}
