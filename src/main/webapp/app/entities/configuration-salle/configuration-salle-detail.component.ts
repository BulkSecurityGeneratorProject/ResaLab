import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ConfigurationSalle } from './configuration-salle.model';
import { ConfigurationSalleService } from './configuration-salle.service';

@Component({
    selector: 'jhi-configuration-salle-detail',
    templateUrl: './configuration-salle-detail.component.html'
})
export class ConfigurationSalleDetailComponent implements OnInit, OnDestroy {

    configurationSalle: ConfigurationSalle;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private configurationSalleService: ConfigurationSalleService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInConfigurationSalles();
    }

    load(id) {
        this.configurationSalleService.find(id).subscribe((configurationSalle) => {
            this.configurationSalle = configurationSalle;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInConfigurationSalles() {
        this.eventSubscriber = this.eventManager.subscribe(
            'configurationSalleListModification',
            (response) => this.load(this.configurationSalle.id)
        );
    }
}
