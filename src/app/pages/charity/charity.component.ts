import {PaymentDialogComponent} from '../../shared/payment-dialog/payment-dialog.component';

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatSliderChange} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {ProjectBean} from '../../shared/api/project.bean';
import {ProjectModel} from '../../shared/api/project.model';
import {InvoiceModel, LineModel} from '../../shared/api/invoice.model';

@Component({
    selector: 'app-charity',
    templateUrl: './charity.component.html',
    styleUrls: ['./charity.component.styl']
})
export class CharityComponent implements OnInit {

    private static BASE_URL = 'https://47d28a03.ngrok.io';
    charityName: string;
    charityIconUrl: string;
    charityDescription: string[];
    projects: ProjectModel[];
    tipAmount: number;
    donationAmount: number;
    remainingMoney: number;
    hijacked: boolean;

    constructor(private router: Router, private dialog: MatDialog, private client: HttpClient) {
        const urls = this.router.url.split('/');
        this.charityName = urls[urls.length - 1].replace('%20', ' ');
        if (this.charityName === 'Mental Health%20Foundation') {
            this.hijacked = true;
            this.hijack();
        } else {
            this.charityIconUrl = 'assets/logos/endless-pawsibilities.png';
            this.charityDescription = ['Endless Pawsibilities is an animal hospice, established in 2012 by animal-lovers John Smith and Jane Doe. Initally operating only from their small garden shed in Nottinghamshire, John and Jane operated on wildlife animals brought in by neighbours in the local area. As their hospice grew in popularity, so did the variety of animals they cared for; with alpacas, bald eagles and even one very lost two-toed sloth making a visit to their hospice in the past few years.'];
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
            this.tipAmount = this.donationAmount / 100;

            this.remainingMoney = 0;
        }
    }

    hijack() {
        this.charityName = 'Mental Health Foundation';
        this.charityIconUrl = '/assets/logos/mental-health-foundation.png';
        this.charityDescription = ['The Mental Health Foundation was founded in 1949. It is a British charitable organisation that provides information, carries out research, and campaigns to improve services for people affected by mental health problems. It now incorporates the Foundation for People with Learning Disabilities.', 'The strategic objectives of the Mental Health Foundation are to help people understand, protect and maintain their mental health. The Foundation takes a public health approach, focusing on the prevention of mental health problems in the first instance.[4] The Foundation runs programmes with a variety of groups who are most at risk of mental ill health, including single mothers, older people, and children in care.'];
        this.donationAmount = 20;
        this.projects = [];
        this.projects.push(new ProjectModel('dummy', 'Children, young people & families'));
        this.projects.push(new ProjectModel('dummy', 'Mental health in the workplace'));
        this.projects.push(new ProjectModel('dummy', 'Mental health in later life'));
        this.projects.push(new ProjectModel('dummy', 'Learning disabilities & mental health'));
        this.projects.push(new ProjectModel('dummy', 'Influencing policy'));
        this.projects.push(new ProjectModel('dummy', 'Research'));
        this.projects.push(new ProjectModel('dummy', 'Challenging mental health and inequalities'));
        this.projects.push(new ProjectModel('dummy', 'Prevention resources and tools'));
        this.projects.push(new ProjectModel('dummy', 'Mindfulness'));

        this.tipAmount = this.donationAmount / 100;

        const projectReserve = (this.donationAmount - this.tipAmount) / this.projects.length;
        for (const project of this.projects) {
            project.amount = projectReserve;
        }

        this.remainingMoney = 0;
    }

    ngOnInit() {
    }

    sliderChange(project: ProjectModel, event: MatSliderChange) {
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
        this.tipAmount = this.donationAmount / 100;

        const projectReserve = (this.donationAmount - this.tipAmount) / this.projects.length;
        for (const project of this.projects) {
            project.amount = projectReserve;
        }
        this.remainingMoney = this.donationAmount - this.tipAmount - this.donationTotal();
    }

    donate() {
        const userId = sessionStorage.getItem('userId');
        if (userId === null || userId === undefined) {
            alert('Please log in before donating');
        } else {
            const dialog = this.dialog.open(PaymentDialogComponent);
            dialog.afterClosed().toPromise().then(() => {
                const lines = [];
                for (const project of this.projects) {
                    lines.push(new LineModel(project.id, 'Donation towards Project: ' + project.name, project.amount));
                }
                const invoice = new InvoiceModel(userId, lines);

                return this.client.post(CharityComponent.BASE_URL + '/invoices', invoice).toPromise();
            })
                .then(() => alert('Thank you for your donation, you will receive texts when your support is used!'));
        }
    }
}
