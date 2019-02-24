import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl']
})
export class AppComponent {
    title = 'FollowYourDonation';
    search: string;

    constructor(private router: Router) {
        this.search = '';
    }

    goHome() {
        this.router.navigate(['/']);
    }

    searchFor(name: string) {
        this.search = name.toLowerCase();
        this.router.navigate(['/search'], {
            queryParams: {
                'query': name
            }
        });
    }
}
