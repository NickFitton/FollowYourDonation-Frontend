import {PaymentDialogComponent} from '../../shared/payment-dialog/payment-dialog.component';

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatSliderChange} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {ProjectBean} from '../../shared/api/project.bean';
import {ProjectModel} from '../../shared/api/project.model';

@Component({
    selector: 'app-charity',
    templateUrl: './charity.component.html',
    styleUrls: ['./charity.component.styl']
})
export class CharityComponent implements OnInit {

    private static BASE_URL = 'https://47d28a03.ngrok.io';
    charityName: string;
    charityIconUrl: string;
    charityDescription: string;
    projects: ProjectModel[];
    tipAmount: number;
    donationAmount: number;
    remainingMoney: number;

    constructor(private router: Router, private dialog: MatDialog, private client: HttpClient) {
        const urls = this.router.url.split('/');
        this.charityName = urls[urls.length - 1].replace('%20', ' ');
        this.charityIconUrl = 'assets/logos/endless-pawsibilities.png';
        this.charityDescription = 'Endless Pawsibilities is an animal hospice, established in 2012 by animal-lovers John Smith and Jane Doe. Initally operating only from their small garden shed in Nottinghamshire, John and Jane operated on wildlife animals brought in by neighbours in the local area. As their hospice grew in popularity, so did the variety of animals they cared for; with alpacas, bald eagles and even one very lost two-toed sloth making a visit to their hospice in the past few years.';
        this.donationAmount = 20;
        this.projects = [];
        client.get<ProjectBean[]>(CharityComponent.BASE_URL + '/projects').toPromise().then(beans => {
            const models = [];
            for (const bean of beans) {
                models.push(new ProjectModel(bean.id, bean.name));
            }
            return models;
        }).then(models => {
            this.projects = models;

            const projectReserve = (this.donationAmount - this.tipAmount) / this.projects.length;
            for (const project of this.projects) {
                project.amount = projectReserve;
            }
        });
        this.tipAmount = this.donationAmount / 10;

        this.remainingMoney = 0;
    }

    ngOnInit() {
    }

    sliderChange(project: Project, event: MatSliderChange) {
        for (const aProject of this.projects) {
            if (project === aProject) {
                project.amount = event.value;
            }
        }
        this.remainingMoney = this.donationAmount - this.tipAmount - this.donationTotal();
    }

    donationTotal(): number {
        let total = 0;
        for (const project of this.projects) {
            total += project.amount;
        }
        return total;
    }

    donationChanged(): void {
        this.tipAmount = this.donationAmount / 10;

        const projectReserve = (this.donationAmount - this.tipAmount) / this.projects.length;
        for (const project of this.projects) {
            project.amount = projectReserve;
        }
        this.remainingMoney = this.donationAmount - this.tipAmount - this.donationTotal();
    }

    donate() {
        const dialog = this.dialog.open(PaymentDialogComponent);
        dialog.afterClosed().toPromise().then();
    }
}

class Project {
    name: string;
    amount: number;

    constructor(
        name: string,
        amount: number) {
        this.name = name;
        this.amount = amount;
    }
}
