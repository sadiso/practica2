import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Signupreq } from '../model/request/signupreq';
import { Signupres } from '../model/response/signupres';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signUp: Signupreq = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ){}

  signUpForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(50),
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50)
    ])
  });

  signup(){
    this.signUp.firstName = this.signUpForm.getRawValue().firstName as string;
    this.signUp.lastName = this.signUpForm.getRawValue().lastName as string;
    this.signUp.email = this.signUpForm.getRawValue().email as string;
    this.signUp.password = this.signUpForm.getRawValue().password as string;

    this.authenticationService.signUp(this.signUp)
    .subscribe((jwt: Signupres) => {
      if(jwt.accessToken == "Failed creating user"){
        localStorage.setItem('accessToken', "");
        this.router.navigate(['/signup']);
      }else{
        localStorage.setItem('accessToken', jwt.accessToken);
        this.router.navigate(['/home']);
      }
    })
  }
}
