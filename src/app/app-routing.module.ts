import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {CharityComponent} from './pages/charity/charity.component';
import {RegisterComponent} from './pages/register/register.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {SearchComponent} from './pages/search/search.component';
import {DonationsComponent} from './pages/donations/donations.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', redirectTo: ''},
    {path: 'dashboard', redirectTo: ''},
    {path: 'search', component: SearchComponent},
    {path: 'donations', component: DonationsComponent},
    {path: '', component: DashboardComponent},
    {path: 'charity/:name', component: CharityComponent},
    {path: 'invoice/:name', component: CharityComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
