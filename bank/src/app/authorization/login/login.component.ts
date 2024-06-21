import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Signinreq } from '../model/request/signinreq';
import { Signinres } from '../model/response/signinres';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  sigIn: Signinreq = {
    email: "",
    password: ""
  };

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ){}

  signInForm = new FormGroup({
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

  login(){
    this.sigIn.email = this.signInForm.getRawValue().email as string;
    this.sigIn.password = this.signInForm.getRawValue().password as string;

    this.authenticationService.signIn(this.sigIn)
    .subscribe((jwt: Signinres) => {
      if(jwt.accessToken == "Not found user"){
        localStorage.setItem('accessToken', "");
        this.router.navigate(['/signup']);
      }else{
        localStorage.setItem('accessToken', jwt.accessToken);
        this.router.navigate(['/home']);
      }
    })
  }
}

