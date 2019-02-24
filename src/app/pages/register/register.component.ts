import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../../shared/api/user.model';
import {IdBean} from '../../shared/api/IdBean';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.styl']
})
export class RegisterComponent implements OnInit {

    private firstName: string;
    private lastName: string;
    private phoneNumber: string;

    private static BASE_URL = 'https://47d28a03.ngrok.io';

    constructor(private client: HttpClient, private router: Router) {
        this.firstName = '';
        this.lastName = '';
        this.phoneNumber = '';
    }

    ngOnInit() {
    }

    register(): void {
        const user = new UserModel(this.firstName, this.lastName, this.phoneNumber);
        console.log(user);
        this.client.post<IdBean>(RegisterComponent.BASE_URL + '/users', user)
            .toPromise().then(bean => {
            return bean.id;
        }).then(id => {
            sessionStorage.setItem('userId', id);
            this.router.navigate(['/search']);
        });
    }
}
