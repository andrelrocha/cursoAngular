import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  performLogin(): void {
    console.log(this.loginForm.value);
  }
}
