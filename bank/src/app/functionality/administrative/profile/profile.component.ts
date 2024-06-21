import { Component } from '@angular/core';
import { AuthenticationService } from '../../../authorization/services/authentication.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location, NgClass } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  showPassword: Boolean = false;
  visibilityPassword: string = "password";

  constructor(
    private authenticationService: AuthenticationService,
    private location: Location
  ){}

  profileForm = new FormGroup({
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

  ngOnInit(){
    this.authenticationService.getUserProfile()
    .subscribe(profileRes => this.profileForm.patchValue(profileRes));
  }

  togglePasswordVisibilityOnclick():void{
    this.showPassword = !this.showPassword;
    if(this.showPassword){
      this.visibilityPassword = "text";
    }else{
      this.visibilityPassword = "password";
    } 
  }

  goBack(): void {
    this.location.back();
  }
}
