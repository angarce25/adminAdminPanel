import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule,RouterLink],
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private _router: Router,
    private _login: LoginService
  ) {}

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      hiddenField: new FormControl('')
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this._login.loginUser(this.loginForm.value).subscribe({
        next: (resp: any) => {
          console.log(resp);

          // Verificar que resp.result esté definido
          if (resp.result) {
            localStorage.setItem("firstName", resp.result.firstName || '');
            localStorage.setItem("lastName", resp.result.lastName || '');
            localStorage.setItem("email", resp.result.email || '');
            localStorage.setItem("id", resp.result._id || '');
          }
          localStorage.setItem("token", resp.token);

          Swal.fire({
            position: 'top-end',
            title: "Login Successful!",
            text: "Redirecting to dashboard...",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            didClose: () => {
              this._router.navigate(['dashboard']);
            }
          });
        },
        error: (err) => {
          Swal.fire({
            title: "Login Failed!",
            text: err.error.msg || "Unknown error occurred.",
            icon: "error"
          });
        }
      });
    }
  }
}