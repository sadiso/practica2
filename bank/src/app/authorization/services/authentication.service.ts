import { Injectable } from '@angular/core';
import { HandlerExceptionsService } from '../../utils/services/handler-exceptions.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, lastValueFrom, tap } from 'rxjs';
import { Signinres } from '../login/model/response/signinres';
import { Signinreq } from '../login/model/request/signinreq';
import { Profileres } from '../login/model/response/profileres';
import { Signupreq } from '../login/model/request/signupreq';
import { Signupres } from '../login/model/response/signupres';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  sigInError: Signinres = {
    accessToken: "Not found user"
  };

  signUpError: Signupres = {
    accessToken: "Failed creating user"
  };

  profileError: Profileres = {
    id: "Not user session",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    accounts: [],
    role: ""
  };

  constructor(
    private handlerException: HandlerExceptionsService,
    private http: HttpClient
  ) { }

  signIn(userSingIn: Signinreq):Observable<Signinres>{
    return this.http.post<Signinres>("http://localhost:3000/signin", userSingIn)
    .pipe(
      tap(_ => this.handlerException.log('signin user')),
      catchError(this.handlerException.handleError<Signinres>('signIn', this.sigInError))
    );
  }

  signUp(userSingUp: Signupreq):Observable<Signupres>{
    return this.http.post<Signupres>("http://localhost:3000/signup", userSingUp)
    .pipe(
      tap(_ => this.handlerException.log('signup user')),
      catchError(this.handlerException.handleError<Signupres>('signup', this.signUpError))
    );
  }

  getUserProfile():Observable<Profileres>{
    return this.http.get<Profileres>("http://localhost:3000/users/profile")
    .pipe(
      tap(_ => this.handlerException.log('profile user')),
      catchError(this.handlerException.handleError<Profileres>('profile', this.profileError))
    );
  }

  async getUserProfileAsync():Promise<Profileres>{
    try {
      const response = await lastValueFrom(this.http.get<Profileres>("http://localhost:3000/users/profile"));
      return response;
    } catch (error) {
      this.handlerException.handleError<Profileres>('profile', this.profileError);
      return this.profileError;
    }
  }
}

