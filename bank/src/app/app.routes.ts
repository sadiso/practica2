import { Routes } from '@angular/router';
import { LoginComponent } from './authorization/login/login.component';
import { SignupComponent } from './authorization/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { loggedinGuard } from './utils/guards/loggedin.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'home',
        canActivate: [loggedinGuard],
        component: HomeComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: '**',
        component: SignupComponent
    }
];
