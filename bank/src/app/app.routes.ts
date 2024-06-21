import { Routes } from '@angular/router';
import { LoginComponent } from './authorization/login/login.component';
import { SignupComponent } from './authorization/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { loggedinGuard } from './utils/guards/loggedin.guard';
import { ProfileComponent } from './functionality/administrative/profile/profile.component';
import { TransactionComponent } from './functionality/monetary/transaction/transaction.component';
import { AccountsComponent } from './functionality/administrative/accounts/accounts.component';
import { DashboardComponent } from './functionality/administrative/dashboard/dashboard.component';

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
        path: 'profile',
        canActivate: [loggedinGuard],
        component: ProfileComponent
    },
    {
        path: 'transactions',
        canActivate: [loggedinGuard],
        component: TransactionComponent
    },
    {
        path: 'accounts',
        canActivate: [loggedinGuard],
        component: AccountsComponent
    },
    {
        path: 'dashboard',
        canActivate: [loggedinGuard],
        component: DashboardComponent
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
