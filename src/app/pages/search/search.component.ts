import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.styl']
})
export class SearchComponent implements OnInit {

    categories: SearchCategory[];
    charities: Charity[];
    search: string;

    constructor(private router: Router) {
        const urlSegs = this.router.url.split('?');
        if (urlSegs.length > 1) {
            const params = urlSegs[1].split('&');
            const remainingParams = params.filter(param => param.includes('query'));
            if (remainingParams.length === 1) {
                this.search = remainingParams[0].split('=')[1].toLowerCase();
            } else {
                this.search = '';
            }
        } else {
            this.search = '';
        }
        this.categories = [];
        this.categories.push(new SearchCategory(['Animals'], 'assets/category/animals.jpg'));
        this.categories.push(new SearchCategory(['Arts', 'Culture', 'Humanities'], 'assets/category/artsCultureHumanities.jpg'));
        this.categories.push(new SearchCategory(['Community', 'Development'], 'assets/category/communityDevelopment.jpg'));
        this.categories.push(new SearchCategory(['Educational'], 'assets/category/educational.jpg'));
        this.categories.push(new SearchCategory(['Environment'], 'assets/category/environment.jpg'));
        this.categories.push(new SearchCategory(['Health'], 'assets/category/health.jpg'));
        this.categories.push(new SearchCategory(['Human', 'Services'], 'assets/category/humanServices.jpg'));
        this.categories.push(new SearchCategory(['International'], 'assets/category/international.jpg'));
        this.categories.push(new SearchCategory(['Research &', 'Public Policy'], 'assets/category/research.jpg'));
        this.categories.push(new SearchCategory(['Religion'], 'assets/category/religion.jpg'));

        this.charities = [];
        this.charities.push(new Charity('Dogs Trust', ['Animals'], ''));
        this.charities.push(new Charity('RSPCA', ['Animals'], ''));
        this.charities.push(new Charity('PETA Foundation', ['Animals'], ''));
        this.charities.push(new Charity('Battersea Dogs & Cats Home', ['Animals'], ''));
        this.charities.push(new Charity('World Animal Protection', ['Animals'], ''));
        this.charities.push(new Charity('WWF', ['Animals'], ''));
        this.charities.push(new Charity('Human Society International', ['Animals'], ''));
        this.charities.push(new Charity('Animal Welfare Institute', ['Animals'], ''));
        this.charities.push(new Charity('Friends of Animals', ['Animals'], ''));
        this.charities.push(new Charity('Wildlife Conservation Society', ['Animals'], ''));
        this.charities.push(new Charity('PetSmart Charities', ['Animals'], ''));
        this.charities.push(new Charity('The Marine Mammal Center', ['Animals'], ''));
        this.charities.push(new Charity('Performing Animal Welfare Society', ['Animals'], ''));
        this.charities.push(new Charity('Wags and Walks', ['Animals'], ''));
        this.charities.push(new Charity('Dogs Without Borders', ['Animals'], ''));
        this.charities.push(new Charity('Blue Cross', ['Animals'], ''));
        this.charities.push(new Charity('Endless Pawsibilities', ['Animals'], ''));

        this.charities = this.charities.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    }

    ngOnInit() {
    }

    searchTrue(categories: string[], search: string): boolean {
        search = search.toLowerCase();
        return categories.filter(category => category.toLowerCase().includes(search)).length > 0;
    }

    filteredCharities() {
        return this.charities.filter(charity => this.searchTrue(charity.categories, this.search) || charity.name.toLowerCase().includes(this.search.toLowerCase()));
    }

    navTo(charityName: string) {
        this.router.navigate(['/charity/' + charityName]);
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

class SearchCategory {
    public name: string[];
    public imageLink: string;

    constructor(name: string[],
                imageLink: string) {
        this.name = name;
        this.imageLink = imageLink;
    }
}

class Charity {
    public name: string;
    public categories: string[];
    public imageLink: string;

    constructor(
        name: string,
        categories: string[],
        imageLink: string) {
        this.name = name;
        this.categories = categories;
        this.imageLink = imageLink;
    }
}
