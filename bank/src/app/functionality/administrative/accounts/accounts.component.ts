import { Component } from '@angular/core';
import { AuthenticationService } from '../../../authorization/services/authentication.service';
import { Location, NgFor } from '@angular/common';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [NgFor],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {

  accountsList: number[] = [];
  init: number = 0;
  constructor(
    private authenticationService: AuthenticationService,
    private location: Location
  ){}

  ngOnInit(){
    this.authenticationService.getUserProfile()
    .subscribe(profile => this.accountsList = profile.accounts);
  }

  goBack(): void {
    this.location.back();
  }
}
