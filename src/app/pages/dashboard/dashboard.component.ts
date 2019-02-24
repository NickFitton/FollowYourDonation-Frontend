import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.styl']
})
export class DashboardComponent implements OnInit {

    search: string;

    constructor(private router: Router) {
        this.search = '';
    }

    ngOnInit() {
    }

    goTo(url: string) {
        console.log('Nav to ' + url);
        this.router.navigate([url]);
    }

    searchFor() {
        this.router.navigate(['/search'], {
            queryParams: {
                'query': this.search
            }
        });
    }
}
