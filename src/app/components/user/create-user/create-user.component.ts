import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      login: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*\\d).*$')]]
    });
  }

  onSubmit() {
    console.log('Formulário submetido:');
    console.log('Formulário:', this.userForm.value);
    console.log('Nome:', this.userForm.value.nome);
      console.log('CPF:', this.userForm.value.cpf);
      console.log('Login:', this.userForm.value.login);
      console.log('Senha:', this.userForm.value.senha);


    if (this.userForm.valid) {
      console.log('Formulário válido:');
      console.log('Nome:', this.userForm.value.nome);
      console.log('CPF:', this.userForm.value.cpf);
      console.log('Login:', this.userForm.value.login);
      console.log('Senha:', this.userForm.value.senha);
    } else {
      console.log('Formulário inválido:');
      console.log('Erros:', this.userForm.errors);
    }
  }
}
