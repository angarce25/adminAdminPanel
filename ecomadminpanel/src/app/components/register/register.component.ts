import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrService } from '../../services/registr.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  userRegForm!: FormGroup;


  constructor(
    private _register: RegistrService
  ) {


  }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.userRegForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(80),
        Validators.pattern(/^[a-zA-Z\s]*$/),
        Validators.minLength(1),
        Validators.maxLength(80)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(80),
        Validators.pattern(/^[a-zA-Z\s]*$/),
        Validators.minLength(1),
        Validators.maxLength(80)
      ]),
      contact: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(6|7|8|9)\d{8}$/),
        Validators.minLength(9),
        Validators.maxLength(9)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      ]),
      confirmPassword: new FormControl('', Validators.required),
      'hiddenField': new FormControl('') // Agrega este control para el campo oculto
    });
  }
  register() {
    console.log(this.userRegForm.valid);
    console.log(this.userRegForm.value);

    if (this.userRegForm.valid) {
      console.log(this.userRegForm.value);
      this._register.registerUser(this.userRegForm.value).subscribe((response: any) => { // Manejar la respuesta

          console.log(response); // Comprobar la respuesta en la consola
          this.userRegForm.reset();
          alert(response.msg); 
      });
    } else {
      alert('Please Fill Valid Details...!')
    }


  }
}  
