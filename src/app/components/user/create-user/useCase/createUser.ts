import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
            alert(`Bem-vindo ${response.login}`);
            userForm.reset();
            //window.location.href = 'http://localhost:1313/login';
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
      this.logValidationErrors(userForm);
    }
  }

  private logValidationErrors(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl != null && abstractControl.invalid) {
        console.log('Campo inválido:', key);
        console.log('Erros:', abstractControl.errors);

        if (abstractControl?.errors?.['required']) {
          alert(`O campo ${key} é obrigatório.`);
        }

        if (abstractControl.errors?.['email']) {
          alert('Por favor, insira um endereço de e-mail válido.');
        }

        const erroTamanho = abstractControl.errors?.['minlength'];
        const erroPadrao = abstractControl.errors?.['pattern'];

        if (erroTamanho || erroPadrao) {
          console.log('Erro de tamanho ou padrão:', erroTamanho || erroPadrao);
          if (erroPadrao['requiredPattern'] === '^(?=.*[A-Z])(?=.*\\d).*$') {
            alert('A senha deve ter pelo menos 8 caracteres e conter pelo menos uma letra maiúscula e um número.');
          } else if (erroPadrao['requiredPattern'] === '^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$') {
            alert('O CPF deve seguir o formato 999.999.999-99.');
          }

          if (erroTamanho) {
            alert(`O campo ${key} deve ter pelo menos ${erroTamanho.requiredLength} caracteres.`);
          }
        }
        }
    });
  }
}
